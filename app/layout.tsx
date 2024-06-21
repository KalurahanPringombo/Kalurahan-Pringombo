import { auth } from '@/auth';
import { ToastProvider } from '@/providers/toaster-provider';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Kalurahan Pringombo',
	description: 'Sanata Dharma University',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();
	return (
		<html lang="en">
			<body className={inter.className}>
				<SessionProvider session={session}>
					<ToastProvider />
					{children}
				</SessionProvider>
			</body>
		</html>
	);
}
