import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { countAgeByDate } from '@/lib/formats/count-age';
import { FormatCamelCase } from '@/lib/formats/format-string';
import { timeZoneFormatString } from '@/lib/formats/time-zone';

const SURAT_KETERANGAN_USAHA_URL = process.env.SUKET_USAHA_URL;

export async function GET(req: NextRequest) {
	const session = await auth();
	if (!session) {
		return NextResponse.json(
			{ data: null, message: 'Unautorized' },
			{ status: 409 }
		);
	}

	try {
		const surat = await db.suketUsaha.findMany();

		if (!surat) {
			return NextResponse.json(
				{ data: null, message: 'Surat Keterangan Usaha Tidak Ditemukan' },
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

		const suketUsahaExists = await db.suketUsaha.findUnique({
			where: {
				no_surat: values.no_surat,
			},
		});

		if (suketUsahaExists) {
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
			nama_lengkap: dataPerson.nama,
			nik: atob(dataPerson.nik),
			nama_panggilan: dataPerson.alias ? dataPerson.alias : '-',
			tempat_lahir: dataPerson.tempat_lahir ? dataPerson.tempat_lahir : '-',
			tanggal_lahir: dataPerson.tanggal_lahir
				? timeZoneFormatString(dataPerson.tanggal_lahir)
				: '-',
			usia: dataPerson.tanggal_lahir
				? countAgeByDate(dataPerson.tanggal_lahir)
				: '-',
			rt: dataPerson.rt,
			rw: dataPerson.rw,
			padukuhan: dataPerson.padukuhan
				? FormatCamelCase(dataPerson.padukuhan)
				: '-',
			usaha_pokok: dataPerson.pekerjaan,
			usaha_sampingan: values.usaha_sampingan,
			di_kalurahan: values.di_kalurahan,
			di_kapanewon: values.di_kapanewon,
			di_kabupaten: values.di_kabupaten,
			tanggal_surat: tanggalSurat,
			nama_lurah: lurah?.nama,
		};

		const postToDrive = await fetch(`${SURAT_KETERANGAN_USAHA_URL}`, {
			method: 'POST',
			body: JSON.stringify(data),
		});

		const getDocId = await postToDrive.text();
		const createSurat = await db.suketUsaha.create({
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
