import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';

import { db } from '@/lib/db';
import { FormatCamelCase } from '@/lib/formats/format-string';
import {
	timeZoneFormatString,
	timeZoneGetTimeString,
	timeZoneWithDayName,
} from '@/lib/formats/time-zone';

const SURAT_IZIN_KERAMAIAN = process.env.IZIN_KERAMAIAN_URL;

export async function GET(req: NextRequest) {
	const session = await auth();
	if (!session) {
		return NextResponse.json(
			{ data: null, message: 'Unautorized' },
			{ status: 409 }
		);
	}

	try {
		const surat = await db.izinKeramaian.findMany();

		if (!surat) {
			return NextResponse.json(
				{ data: null, message: 'Surat Izin Keramaian Tidak Ditemukan' },
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

		const suratExists = await db.izinKeramaian.findUnique({
			where: {
				no_surat: values.no_surat,
			},
		});

		if (suratExists) {
			return NextResponse.json({
				data: null,
				message: 'Nomor Surat Sudah Ada',
			});
		}

		const tanggalSurat = timeZoneFormatString(new Date());
		const waktuKeramaian = new Date(values.waktu_keramaian);

		const lurah = await db.penduduk.findFirst({
			where: {
				jabatan_di_kalurahan: 'lurah',
			},
		});

		const data = {
			tanggal_surat: tanggalSurat,
			nama_lengkap: dataPerson.nama,
			pekerjaan: dataPerson.pekerjaan ? dataPerson.pekerjaan : '-',
			usia: dataPerson.umur,
			jenis_kelamin: dataPerson.jenis_kelamin ? dataPerson.jenis_kelamin : '-',
			padukuhan: dataPerson.padukuhan
				? FormatCamelCase(dataPerson.padukuhan)
				: '-',
			rt: dataPerson.rt ? dataPerson.rt : '-',
			rw: dataPerson.rw ? dataPerson.rw : '-',
			tanggal_keramaian: timeZoneWithDayName(waktuKeramaian),
			waktu_keramaian: timeZoneGetTimeString(waktuKeramaian),
			tempat_keramaian: values.tempat_keramaian,
			lama_keramaian: values.lama_keramaian,
			jenis_keramaian: values.jenis_keramaian,
			keperluan_keramaian: values.keperluan_keramaian,
			no_surat: atob(values.no_surat),
			nama_lurah: lurah?.nama,
		};

		const postToDrive = await fetch(`${SURAT_IZIN_KERAMAIAN}`, {
			method: 'POST',
			body: JSON.stringify(data),
		});

		const getDocId = await postToDrive.text();

		const createSurat = await db.izinKeramaian.create({
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
