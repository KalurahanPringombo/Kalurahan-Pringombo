'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import LoadingPage from '@/components/loading';

function PrintLayout({ children }: { children: React.ReactNode }) {
	const session = useSession();
	if (session.status === 'unauthenticated') return redirect('/denied');
	return (
		<div className="h-full">
			<Suspense fallback={<LoadingPage />}>{children}</Suspense>
		</div>
	);
}

export default PrintLayout;
