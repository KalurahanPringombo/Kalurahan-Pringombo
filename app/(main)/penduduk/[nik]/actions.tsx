'use client';

import Link from 'next/link';
import toast from 'react-hot-toast';

import { BsPencil, BsTrash } from 'react-icons/bs';

import { deletePersonByNik } from '@/actions/penduduk/penduduk-actions';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

type Props = {
	nik: string;
};
function Actions({ nik }: Props) {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const onDelete = async () => {
		try {
			startTransition(() => {
				deletePersonByNik(nik).then((response) => {
					toast.success(response.message);
					router.refresh();
					router.push(`/penduduk/data-penduduk`);
				});
			});
		} catch {
			toast.error('Gagal menghapus data');
		}
	};
	return (
		<nav className="flex gap-2">
			<Link href="/penduduk/[nik]" as={`/penduduk/${nik}/edit`}>
				<Button
					variant="ghost"
					className="bg-slate-700 shadow-lg text-white hover:bg-slate-600 hover:text-white"
				>
					<BsPencil className="mr-2 w-4 h-4" />
					Edit
				</Button>
			</Link>

			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button
						variant="secondary"
						className="bg-red-500 shadow-lg text-white hover:bg-red-600"
					>
						<BsTrash className="mr-2 w-4 h-4" />
						Hapus
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Apakah anda yakin ingin menghapus{' '}
							<span className="text-sky-700 font-semibold">{atob(nik)}</span>?
						</AlertDialogTitle>
						<AlertDialogDescription className="my-4">
							Data yang sudah dihapus tidak bisa dikembalikan
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Batal</AlertDialogCancel>
						<AlertDialogAction onClick={onDelete} disabled={isPending}>
							Hapus
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</nav>
	);
}

export default Actions;
