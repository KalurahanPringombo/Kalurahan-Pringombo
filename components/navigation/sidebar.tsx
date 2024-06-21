import Link from 'next/link';

import { Logo } from '@/components/navigation/logo';
import { SidebarRoutes } from '@/components/navigation/sidebar-routes';

export const Sidebar = () => {
	return (
		<div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
			<Link href="/" className="p-6">
				<Logo />
			</Link>
			<div className="flex flex-col w-full">
				<SidebarRoutes />
			</div>
		</div>
	);
};
