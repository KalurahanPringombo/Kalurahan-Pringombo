import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { FormatCamelCase } from '@/lib/formats/format-string';
import { timeZoneFormatString } from '@/lib/formats/time-zone';

const SURAT_PENGANTAR_SKCK_URL = process.env.PENGANTAR_SKCK_URL;

export async function GET(req: NextRequest) {
	const session = await auth();
	if (!session) {
		return NextResponse.json(
			{ data: null, message: 'Unautorized' },
			{ status: 409 }
		);
	}

	try {
		const surat = await db.pengantarSKCK.findMany();

		if (!surat) {
			return NextResponse.json(
				{ data: null, message: 'Pengantar SKCK not found' },
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

		const pengantarSkckExists = await db.pengantarSKCK.findUnique({
			where: {
				no_surat: values.no_surat,
			},
		});

		if (pengantarSkckExists) {
			return NextResponse.json({
				data: null,
				message: 'Nomor Surat Sudah Ada',
			});
		}

		const pengantarSkckOwner = await db.penduduk.findFirst({
			where: {
				nik: values.pendudukId,
			},
			include: {
				pengantar_skck: true,
			},
		});

		if (pengantarSkckOwner?.pengantar_skck !== null) {
			return NextResponse.json({
				data: null,
				message: 'Sudah Memiliki Surat Pengantar SKCK',
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
			nama_lengkap: dataPerson.nama,
			nik: atob(dataPerson.nik),
			no_kk: dataPerson.nokk ? atob(dataPerson.nokk) : '-',
			tempat_lahir: dataPerson.tempat_lahir ? dataPerson.tempat_lahir : '-',
			tanggal_lahir: dataPerson.tanggal_lahir
				? timeZoneFormatString(dataPerson.tanggal_lahir)
				: '-',
			jenis_kelamin: dataPerson.jenis_kelamin ? dataPerson.jenis_kelamin : '-',
			kewarganegaraan: dataPerson.kewarganegaraan,
			agama: dataPerson.agama ? dataPerson.agama : '-',
			pekerjaan: dataPerson.pekerjaan ? dataPerson.pekerjaan : '-',
			pendidikan: dataPerson.pendidikan_kk ? dataPerson.pendidikan_kk : '-',
			keperluan: values.keperluan,
			rt: dataPerson.rt,
			rw: dataPerson.rw,
			padukuhan: dataPerson.padukuhan
				? FormatCamelCase(dataPerson.padukuhan)
				: '-',
			tanggal_surat: tanggalSurat,
			nama_lurah: lurah?.nama,
		};

		const postToDrive = await fetch(`${SURAT_PENGANTAR_SKCK_URL}`, {
			method: 'POST',
			body: JSON.stringify(data),
		});

		const getDocId = await postToDrive.text();

		const createSurat = await db.pengantarSKCK.create({
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
