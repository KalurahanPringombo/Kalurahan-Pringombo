import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import { db } from '@/lib/db';

export async function GET(
	req: NextRequest,
	{ params }: { params: { nik: string } }
) {
	try {
		const session = await auth();
		if (!session) {
			return NextResponse.json(
				{ data: null, message: 'Unautorized' },
				{ status: 409 }
			);
		}

		const penduduk = await db.penduduk.findUnique({
			where: {
				nik: params.nik,
			},
		});

		if (!penduduk) {
			return NextResponse.json(
				{ data: null, message: 'NIK Tidak Ditemukan' },
				{ status: 404 }
			);
		}

		return NextResponse.json(
			{
				data: penduduk,
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

export async function PATCH(
	req: NextRequest,
	{ params }: { params: { jabatan_di_kalurahan: string } }
) {
	const session = await auth();
	if (!session) {
		return NextResponse.json(
			{ data: null, message: 'Unautorized' },
			{ status: 409 }
		);
	}

	try {
		const values = await req.json();
		const pejabatSebelum = await db.penduduk.findFirst({
			where: {
				jabatan_di_kalurahan: params.jabatan_di_kalurahan,
			},
		});

		if (!pejabatSebelum) {
			return NextResponse.json(
				{ data: null, message: 'Nama Jabatan Tidak Ditemukan' },
				{ status: 404 }
			);
		}

		await db.penduduk.update({
			where: {
				nik: pejabatSebelum.nik,
			},
			data: { jabatan_di_kalurahan: 'penduduk' },
		});

		const newData = await db.penduduk.update({
			where: {
				nik: values.nik,
			},
			data: {
				jabatan_di_kalurahan: params.jabatan_di_kalurahan,
			},
		});

		return NextResponse.json(
			{
				data: newData,
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
