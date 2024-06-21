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

export async function DELETE(
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
		await db.penduduk.delete({
			where: {
				nik: params.nik,
			},
		});

		return NextResponse.json(
			{
				data: null,
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
		const value = await req.json();

		if (!penduduk) {
			return NextResponse.json(
				{ data: null, message: 'NIK Tidak Ditemukan' },
				{ status: 404 }
			);
		}

		const editData = await db.penduduk.update({
			where: {
				nik: params.nik,
			},
			data: { ...value },
		});

		return NextResponse.json(
			{
				data: editData,
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
