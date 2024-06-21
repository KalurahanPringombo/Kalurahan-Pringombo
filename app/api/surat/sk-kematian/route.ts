import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';

import { db } from '@/lib/db';
import { FormatCamelCase } from '@/lib/formats/format-string';

import { timeZoneFormatString } from '@/lib/formats/time-zone';

const SURAT_KETERANGAN_KEMATIAN_URL = process.env.SK_KEMATIAN_URL;

export async function GET(req: NextRequest) {
	const session = await auth();
	if (!session) {
		return NextResponse.json(
			{ data: null, message: 'Unautorized' },
			{ status: 409 }
		);
	}

	try {
		const surat = await db.suketKematian.findMany();

		if (!surat) {
			return NextResponse.json(
				{ data: null, message: 'Surat Keterangan Kematian Tidak Ditemukan' },
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

		const dataPerson = await db.penduduk.findUnique({
			where: {
				nik: values.pendudukId,
			},
		});

		if (!dataPerson)
			return NextResponse.json(
				{ data: null, message: 'Penduduk Tidak Ditemukan' },
				{ status: 404 }
			);

		const suketKematianExists = await db.suketKematian.findUnique({
			where: {
				no_surat: values.no_surat,
			},
		});

		if (suketKematianExists) {
			return NextResponse.json({
				data: null,
				message: 'Nomor Surat Sudah Ada',
			});
		}

		const suketKematianOwner = await db.penduduk.findFirst({
			where: {
				nik: values.pendudukId,
			},
			include: {
				suket_kematian: true,
			},
		});

		if (suketKematianOwner?.suket_kematian !== null) {
			return NextResponse.json({
				data: null,
				message: 'Sudah Memiliki Surat Keterangan Kematian',
			});
		}

		const tanggalSurat = timeZoneFormatString(new Date());

		const tanggalKematian = new Date(values.tanggal_kematian);

		const lurah = await db.penduduk.findFirst({
			where: {
				jabatan_di_kalurahan: 'lurah',
			},
		});

		const data = {
			no_surat: atob(values.no_surat),
			nama_lengkap: dataPerson.nama,
			nik: atob(dataPerson.nik),
			tempat_lahir: dataPerson.tempat_lahir ? dataPerson.tempat_lahir : '-',
			tanggal_lahir: dataPerson.tanggal_lahir
				? timeZoneFormatString(dataPerson.tanggal_lahir)
				: '-',
			agama: dataPerson.agama ? dataPerson.agama : '-',
			pekerjaan: dataPerson.pekerjaan ? dataPerson.pekerjaan : '-',
			rt: dataPerson.rt,
			rw: dataPerson.rw,
			padukuhan: dataPerson.padukuhan
				? FormatCamelCase(dataPerson.padukuhan)
				: '-',
			lokasi_meninggal: values.lokasi_meninggal,
			tanggal_kematian: timeZoneFormatString(tanggalKematian),
			anak_ke: values.anak_ke,
			nama_ayah: dataPerson.nama_ayah ? dataPerson.nama_ayah : '-',
			nama_ibu: dataPerson.nama_ibu ? dataPerson.nama_ibu : '-',
			tanggal_surat: tanggalSurat,
			nama_lurah: lurah?.nama,
		};

		const postToDrive = await fetch(`${SURAT_KETERANGAN_KEMATIAN_URL}`, {
			method: 'POST',
			body: JSON.stringify(data),
		});

		const getDocId = await postToDrive.text();

		const createSurat = await db.suketKematian.create({
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
