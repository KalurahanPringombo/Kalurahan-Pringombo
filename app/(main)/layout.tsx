'use client';

import { Suspense } from 'react';

import LoadingPage from '@/components/loading';
import { Navbar } from '@/components/navigation/navbar';
import { Sidebar } from '@/components/navigation/sidebar';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="min-h-screen">
			<div className="h-[80px] md:pl-72 fixed inset-y-0 w-full z-50">
				<Navbar />
			</div>
			<div className="hidden md:flex h-full w-72 flex-col fixed inset-y-0 z-50">
				<Sidebar />
			</div>
			<main className="md:pl-72 pt-[80px] h-screen relative">
				<Suspense fallback={<LoadingPage />}>{children}</Suspense>
			</main>
		</div>
	);
};

export default MainLayout;
