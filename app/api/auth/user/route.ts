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

		const user = await db.user.findMany();

		if (!user) {
			return NextResponse.json(
				{ data: null, message: 'User not found' },
				{ status: 404 }
			);
		}

		return NextResponse.json(
			{
				data: user,
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
