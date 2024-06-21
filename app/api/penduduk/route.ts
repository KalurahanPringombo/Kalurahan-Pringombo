import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
	try {
		const session = await auth();
		if (!session) {
			return NextResponse.json(
				{ data: null, message: 'Unautorized' },
				{ status: 409 }
			);
		}

		const penduduk = await db.penduduk.findMany();

		if (!penduduk) {
			return NextResponse.json(
				{ data: null, message: 'Penduduk not found' },
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

export async function DELETE(req: NextRequest) {
	try {
		const penduduk = await db.penduduk.findMany();

		if (!penduduk) {
			return NextResponse.json(
				{ data: null, message: 'Penduduk not found' },
				{ status: 404 }
			);
		}

		await db.penduduk.deleteMany();

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
