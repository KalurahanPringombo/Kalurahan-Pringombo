'use client';

import { useRouter } from 'next/navigation';

import { LogIn } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { UserButton } from '../auth/_components/user-button';

export const NavbarRoutes = () => {
	const router = useRouter();
	const { status, data } = useSession();

	return (
		<>
			{data?.user?.name ? (
				<h1 className="font-bold md:text-3xl">
					Selamat datang <span className="text-sky-700">{data.user.name}</span>
				</h1>
			) : (
				<h1 className="font-bold md:text-3xl">
					Kalurahan <span className="text-sky-700">Pringombo</span>
				</h1>
			)}

			<div className="flex gap-x-2 ml-auto">
				{status === 'authenticated' ? (
					<UserButton />
				) : (
					<Button
						onClick={() => router.push('/auth/login')}
						size="sm"
						variant="ghost"
					>
						<LogIn className="h-4 w-4 mr-2" />
						Login
					</Button>
				)}
			</div>
		</>
	);
};
