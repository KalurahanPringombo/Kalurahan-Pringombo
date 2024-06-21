'use client';

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export const SidebarRoutes = () => {
	const { status } = useSession();

	return (
		<div className="flex flex-col w-full">
			<Accordion type="single" collapsible>
				<AccordionItem value="item-1" className="w-full pl-6">
					<AccordionTrigger className="hover:underline-offset-0 hover:no-underline text-sm">
						Profil Kalurahan
					</AccordionTrigger>
					<AccordionContent className="flex flex-col space-y-2">
						<Link
							href="/profil-kalurahan/tentang-kami"
							className="pl-4 hover:text-sky-700"
						>
							Tentang kami
						</Link>
						<Link
							href="/profil-kalurahan/visi-misi"
							className="pl-4 hover:text-sky-700"
						>
							Visi & Misi
						</Link>
						<Link
							href="/profil-kalurahan/sejarah-kalurahan"
							className="pl-4 hover:text-sky-700"
						>
							Sejarah Kalurahan
						</Link>
						<Link
							href="/profil-kalurahan/geografis-kalurahan"
							className="pl-4 hover:text-sky-700"
						>
							Geografis Kalurahan
						</Link>
						<Link
							href="/profil-kalurahan/demografi-kalurahan"
							className="pl-4 hover:text-sky-700"
						>
							Demografi Kalurahan
						</Link>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
			<Accordion type="single" collapsible>
				<AccordionItem value="item-1" className="w-full pl-6">
					<AccordionTrigger className="hover:underline-offset-0 hover:no-underline text-sm">
						Pemerintahan
					</AccordionTrigger>
					<AccordionContent className="flex flex-col space-y-2">
						<Link
							href="/pemerintahan/struktur-organisasi"
							className="pl-4 hover:text-sky-700"
						>
							Struktur Organisasi
						</Link>
						<Link
							href="/pemerintahan/perangkat-kalurahan"
							className="pl-4 hover:text-sky-700"
						>
							Perangkat Kalurahan
						</Link>
						<Link
							href="/pemerintahan/lembaga-kalurahan"
							className="pl-4 hover:text-sky-700"
						>
							Lembaga Kalurahan
						</Link>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
			<Accordion type="single" collapsible>
				<AccordionItem value="item-1" className="w-full pl-6">
					<AccordionTrigger className="hover:underline-offset-0 hover:no-underline text-sm">
						Informasi
					</AccordionTrigger>
					<AccordionContent className="flex flex-col space-y-2">
						<Link href="/informasi/berita" className="pl-4 hover:text-sky-700">
							Berita
						</Link>
						<Link
							href="/informasi/pengumuman"
							className="pl-4 hover:text-sky-700"
						>
							Pengumuman
						</Link>
						<Link
							href="/informasi/agenda-kegiatan"
							className="pl-4 hover:text-sky-700"
						>
							Agenda Kegiatan
						</Link>
						<Link href="/informasi/galeri" className="pl-4 hover:text-sky-700">
							Galeri
						</Link>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
			{status === 'authenticated' && (
				<>
					<Accordion type="single" collapsible>
						<AccordionItem value="item-1" className="w-full pl-6">
							<AccordionTrigger className="hover:underline-offset-0 hover:no-underline text-sm">
								Layanan
							</AccordionTrigger>
							<AccordionContent className="flex flex-col space-y-2">
								<Link
									href="/layanan/pengantar-skck"
									className="pl-4 hover:text-sky-700"
								>
									Surat Pengantar SKCK
								</Link>
								<Link
									href="/layanan/suket-usaha"
									className="pl-4 hover:text-sky-700"
								>
									Surat Keterangan Usaha
								</Link>
								<Link href="/layanan/sktm" className="pl-4 hover:text-sky-700">
									SKTM
								</Link>
								<Link
									href="/layanan/sk-kematian"
									className="pl-4 hover:text-sky-700"
								>
									Surat Keterangan Kematian
								</Link>
								<Link
									href="/layanan/izin-keramaian"
									className="pl-4 hover:text-sky-700"
								>
									Surat Izin Keramaian
								</Link>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
					<Link
						href="/penduduk/data-penduduk"
						className="w-full pl-6 pt-4 text-sm font-semibold"
					>
						Data Penduduk
					</Link>
				</>
			)}
		</div>
	);
};
