import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { FormatCamelCase } from '@/lib/formats/format-string';
import { timeZoneFormatString } from '@/lib/formats/time-zone';

const SURAT_KETERANGAN_TIDAK_MAMPU_URL = process.env.SKTM_URL;

export async function GET(req: NextRequest) {
	const session = await auth();
	if (!session) {
		return NextResponse.json(
			{ data: null, message: 'Unautorized' },
			{ status: 409 }
		);
	}

	try {
		const surat = await db.sKTM.findMany();

		if (!surat) {
			return NextResponse.json(
				{ data: null, message: 'Surat Keterangan Tidak Mampu Tidak Ditemukan' },
				{ status: 404 }
			);
		}

		return NextResponse.json(
			{
				data: surat,
				message: 'Success',
			},
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{ data: null, message: 'Internal server error' },
			{ status: 500 }
		);
	}
}

export async function POST(req: NextRequest) {
	const session = await auth();
	if (!session) {
		return NextResponse.json(
			{ data: null, message: 'Unautorized' },
			{ status: 409 }
		);
	}

	try {
		const values = await req.json();

		const dataAnak = await db.penduduk.findUnique({
			where: {
				nik: values.nik_anak,
			},
		});

		if (!dataAnak)
			return NextResponse.json(
				{ data: null, message: 'NIK Anak Tidak Ditemukan' },
				{ status: 404 }
			);

		const dataOrtu = await db.penduduk.findUnique({
			where: {
				nik: values.nik_ortu,
			},
		});

		if (!dataOrtu)
			return NextResponse.json(
				{ data: null, message: 'NIK Orangtua Tidak Ditemukan' },
				{ status: 404 }
			);

		const sktmExists = await db.sKTM.findUnique({
			where: {
				no_surat: values.no_surat,
			},
		});

		if (sktmExists) {
			return NextResponse.json({
				data: null,
				message: 'Nomor Surat Sudah Ada',
			});
		}

		const tanggalSurat = timeZoneFormatString(new Date());

		const lurah = await db.penduduk.findFirst({
			where: {
				jabatan_di_kalurahan: 'lurah',
			},
		});

		const data = {
			no_surat: atob(values.no_surat),
			nama_lengkap: dataAnak.nama,
			nik: atob(dataAnak.nik),
			tempat_lahir: dataAnak.tempat_lahir ? dataAnak.tempat_lahir : '-',
			tanggal_lahir: dataAnak.tanggal_lahir
				? timeZoneFormatString(dataAnak.tanggal_lahir)
				: '-',
			jenis_kelamin: dataAnak.jenis_kelamin ? dataAnak.jenis_kelamin : '-',
			nama_instansi: values.nama_instansi ? values.nama_instansi : '-',
			fakultas_prodi: values.fakultas_prodi ? values.fakultas_prodi : '-',
			kelas_semester: values.kelas_semester ? values.kelas_semester : '-',
			nama_ortu: dataOrtu.nama,
			nik_ortu: atob(dataOrtu.nik),
			no_kk: dataOrtu.nokk ? atob(dataOrtu.nokk) : '-',
			tempat_lahir_ortu: dataOrtu.tempat_lahir,
			tanggal_lahir_ortu: dataOrtu.tanggal_lahir
				? timeZoneFormatString(dataOrtu.tanggal_lahir)
				: '-',
			jenis_kelamin_ortu: dataOrtu.jenis_kelamin ? dataOrtu.jenis_kelamin : '-',
			status_kawin: dataOrtu.status_kawin ? dataOrtu.status_kawin : '-',
			pekerjaan: dataOrtu.pekerjaan ? dataOrtu.pekerjaan : '-',
			pendidikan_kk: dataOrtu.pendidikan_kk ? dataOrtu.pendidikan_kk : '-',
			agama_ortu: dataOrtu.agama ? dataOrtu.agama : '-',
			rt: dataOrtu.rt ? dataOrtu.rt : '-',
			rw: dataOrtu.rw ? dataOrtu.rw : '-',
			padukuhan: dataOrtu.padukuhan ? FormatCamelCase(dataOrtu.padukuhan) : '-',
			tanggal_surat: tanggalSurat,
			nama_lurah: lurah?.nama,
		};

		const postToDrive = await fetch(`${SURAT_KETERANGAN_TIDAK_MAMPU_URL}`, {
			method: 'POST',
			body: JSON.stringify(data),
		});

		const getDocId = await postToDrive.text();
		const createSurat = await db.sKTM.create({
			data: {
				doc_id: getDocId,
				...values,
			},
		});

		return NextResponse.json(
			{ data: createSurat, message: 'Berhasil Membuat Surat' },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{ data: null, message: 'Internal Server Error' },
			{ status: 500 }
		);
	}
}
