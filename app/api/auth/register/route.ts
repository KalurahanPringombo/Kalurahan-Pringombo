import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { sendVerificationEmail } from '@/lib/mail';
import { generateVerificationToken } from '@/lib/tokens';

export async function POST(req: NextRequest) {
	try {
		const { email, password, name } = await req.json();

		const existingUser = await db.user.findUnique({
			where: {
				email,
			},
		});

		if (existingUser)
			return NextResponse.json(
				{ data: null, message: 'Email is already in use' },
				{ status: 409 }
			);

		const hashedPassword = await bcrypt.hash(password, 10);

		await db.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
			},
		});

		const verificationToken = await generateVerificationToken(email);
		await sendVerificationEmail(
			verificationToken.email,
			verificationToken.token
		);

		return NextResponse.json(
			{ data: null, message: 'Confirm email sent!' },
			{
				status: 200,
			}
		);
	} catch (error) {
		return NextResponse.json(
			{ data: null, message: 'Internal server error' },
			{ status: 500 }
		);
	}
}
