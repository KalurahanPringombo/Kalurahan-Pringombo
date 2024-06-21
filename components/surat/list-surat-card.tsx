'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import toast from 'react-hot-toast';
import { BsFileEarmarkPdf } from 'react-icons/bs';

import { deleteSuratById } from '@/actions/surat/surat';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

type Props = {
	no_surat: string;
	nama: string;
	nama_surat: string;
	doc_id: string;
};
export const ListSuratCard = ({
	no_surat,
	nama,
	nama_surat,
	doc_id,
}: Props) => {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const onDelete = () => {
		try {
			startTransition(() => {
				deleteSuratById(no_surat, nama_surat).then((response) => {
					if (response.data === null) {
						toast.error(response.message);
					} else {
						toast.success(response.message);
						router.refresh();
					}
				});
			});
		} catch (err: any) {
			toast.error(err.response.data);
		}
	};
	return (
		<Dialog>
			<DialogTrigger>
				<Card className="w-fit p-2 cursor-pointer hover:bg-sky-200/20">
					<div className="w-32 inline-block flex-col items-center justify-center break-words">
						<div className="w-full flex items-center justify-center">
							<BsFileEarmarkPdf className="text-red-600 h-20 w-20" />
						</div>
						<div>
							<h1 className="font-[500] mt-2 text-center truncate">
								{atob(no_surat)}
							</h1>
							<p className="line-clamp-1 text-xs text-center">
								{nama ? nama : '-'}
							</p>
						</div>
					</div>
				</Card>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{nama}</DialogTitle>
					<DialogDescription>{atob(no_surat)}</DialogDescription>
				</DialogHeader>
				<Button asChild className="bg-sky-700">
					<Link
						href={`https://docs.google.com/document/d/${doc_id}/edit`}
						target="_blank"
					>
						Lihat di Google Docs
					</Link>
				</Button>
				<DialogFooter className="pt-4">
					<DialogDescription>
						Jika anda menekan tombol hapus, data akan dihapus secara permanen.
					</DialogDescription>
					<Button
						onClick={() => onDelete()}
						variant="destructive"
						disabled={isPending}
					>
						Hapus
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
