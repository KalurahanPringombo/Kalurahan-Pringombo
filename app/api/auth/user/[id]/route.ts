import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import { db } from '@/lib/db';

export async function GET(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const existingUser = await db.user.findUnique({
			where: {
				id: params.id,
			},
		});

		if (!existingUser) {
			return NextResponse.json(
				{ data: null, message: 'User not found' },
				{ status: 404 }
			);
		}

		return NextResponse.json(
			{
				data: existingUser,
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
	{ params }: { params: { id: string } }
) {
	try {
		const existingUser = await db.user.findUnique({
			where: {
				id: params.id,
			},
		});

		if (!existingUser) {
			return NextResponse.json(
				{ data: null, message: 'User not found' },
				{ status: 404 }
			);
		}

		await db.user.delete({
			where: {
				id: params.id,
			},
		});

		return NextResponse.json(
			{
				data: null,
				message: 'Success Deleted',
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
