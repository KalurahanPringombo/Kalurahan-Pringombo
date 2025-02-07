import { compare } from 'bcryptjs';
import type { NextAuthConfig } from 'next-auth';

import Credentials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

import { getUserByEmail } from '@/data/user';
import { LoginSchema } from '@/schemas';

export default {
	providers: [
		Google,
		Github,
		Credentials({
			async authorize(credentials) {
				const validatedFields = LoginSchema.safeParse(credentials);

				if (validatedFields.success) {
					const { email, password } = validatedFields.data;

					const user = await getUserByEmail(email);

					if (!user || !user.password) {
						return null;
					}

					const passwordsMatch = await compare(password, user.password);

					if (passwordsMatch) {
						return user;
					}
				}
				return null;
			},
		}),
	],
} satisfies NextAuthConfig;
