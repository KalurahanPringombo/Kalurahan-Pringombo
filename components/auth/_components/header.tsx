import { Poppins } from 'next/font/google';

import { cn } from '@/lib/utils';

const font = Poppins({
	subsets: ['latin'],
	weight: ['600'],
});

type HeaderProps = {
	label: string;
};

export const Header = ({ label }: HeaderProps) => {
	return (
		<div className="flex w-full flex-col items-center justify-center gap-y-4">
			<div className={(cn('flex flex-col'), font.className)}>
				<h1 className="text-center text-3xl font-bold">Login</h1>
				<h1 className="text-center text-3xl font-bold">Kalurahan Pringombo</h1>
			</div>
			<p className="text-sm text-muted-foreground">{label}</p>
		</div>
	);
};
