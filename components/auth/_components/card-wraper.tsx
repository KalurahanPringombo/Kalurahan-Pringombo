'use client';

import { BackButton } from '@/components/auth/_components/back-button';
import { Header } from '@/components/auth/_components/header';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';

type CardWraperProps = {
	children: React.ReactNode;
	headerLabel: string;
	backButtonLabel: string;
	backButtonHref: string;
	showSocial?: boolean;
};

export const CardWraper = ({
	children,
	headerLabel,
	backButtonLabel,
	backButtonHref,
	showSocial,
}: CardWraperProps) => {
	return (
		<Card className="w-[400px] bg-neutral-100 shadow-lg dark:border dark:border-neutral-300/20 dark:bg-neutral-900">
			<CardHeader>
				<Header label={headerLabel} />
			</CardHeader>
			<CardContent>{children}</CardContent>
			<CardFooter>
				<BackButton label={backButtonLabel} href={backButtonHref} />
			</CardFooter>
		</Card>
	);
};
