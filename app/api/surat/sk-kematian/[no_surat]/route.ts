import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import { db } from '@/lib/db';

const APPS_SCRIPT_DELETE_URL = process.env.APPS_SCRIPT_DELETE_URL;

export async function GET(
	req: NextRequest,
	{ params }: { params: { no_surat: string } }
) {
	const session = await auth();
	if (!session) {
		return NextResponse.json(
			{ data: null, message: 'Unautorized' },
			{ status: 409 }
		);
	}

	try {
		const surat = await db.suketKematian.findUnique({
			where: {
				no_surat: params.no_surat,
			},
		});
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

export async function DELETE(
	req: NextRequest,
	{ params }: { params: { no_surat: string } }
) {
	try {
		const surat = await db.suketKematian.findUnique({
			where: {
				no_surat: params.no_surat,
			},
		});

		if (!surat) {
			return NextResponse.json(
				{ data: null, message: 'Surat Tidak Ditemukan' },
				{ status: 404 }
			);
		}

		const deleteDrive = await fetch(`${APPS_SCRIPT_DELETE_URL}`, {
			method: 'POST',
			body: JSON.stringify(surat),
		});

		const deleteResponse = await deleteDrive.text();

		const deleteDb = await db.suketKematian.delete({
			where: {
				no_surat: params.no_surat,
			},
		});

		return NextResponse.json(
			{
				data: deleteDb,
				message: 'Berhasil Menghapus Surat',
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
