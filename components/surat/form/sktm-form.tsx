'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

import { createSktm } from '@/actions/surat/sktm';

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
	no_surat: z.string().min(1),
	nik_ortu: z.string().min(1),
	nik_anak: z.string().min(1),
	nama_instansi: z.string().min(1),
	fakultas_prodi: z.string(),
	kelas_semester: z.coerce.number().min(1),
});

export const SktmForm = () => {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			no_surat: '',
			nik_ortu: '',
			nik_anak: '',
			nama_instansi: '',
			fakultas_prodi: '',
			kelas_semester: undefined,
		},
	});

	const { isSubmitting, isValid } = form.formState;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			values.no_surat = btoa(values.no_surat);
			values.nik_ortu = btoa(values.nik_ortu);
			values.nik_anak = btoa(values.nik_anak);
			values.nama_instansi = values.nama_instansi.toUpperCase();
			values.fakultas_prodi = values.fakultas_prodi.toUpperCase();
			values.kelas_semester = values.kelas_semester;
			startTransition(() => {
				createSktm(values).then((response) => {
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
		<nav className="w-full flex justify-between items-center">
			<>
				<h1 className="font-bold text-xl text-sky-700">
					SURAT KETERANGAN TIDAK MAMPU
				</h1>
				<AlertDialog>
					<AlertDialogTrigger
						className="bg-black text-white p-2 rounded-lg font-[500] px-4"
						onClick={() => router.refresh()}
					>
						Buat Surat
					</AlertDialogTrigger>
					<AlertDialogContent>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)}>
								<AlertDialogHeader>
									<AlertDialogTitle className="text-center">
										Buat SKTM
									</AlertDialogTitle>
									<FormLabel className="text-start">Nomor Surat</FormLabel>
									<FormField
										control={form.control}
										name="no_surat"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input
														className="mb-5"
														disabled={isSubmitting}
														placeholder="012/Reg/Test/2023"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormLabel className="text-start">NIK Orangtua</FormLabel>
									<FormField
										control={form.control}
										name="nik_ortu"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input
														className="mb-5"
														disabled={isSubmitting}
														placeholder="34**************"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormLabel className="text-start">NIK Anak</FormLabel>
									<FormField
										control={form.control}
										name="nik_anak"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input
														className="mb-5"
														disabled={isSubmitting}
														placeholder="34**************"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormLabel className="text-start">Nama Instansi</FormLabel>
									<FormField
										control={form.control}
										name="nama_instansi"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input
														className="mb-5"
														disabled={isSubmitting}
														placeholder="Nama sekolah / univ"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormLabel className="text-start">Fakultas/Prodi</FormLabel>
									<FormField
										control={form.control}
										name="fakultas_prodi"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input
														className="mb-5"
														disabled={isSubmitting}
														placeholder="Fakultas/Prodi (jika ada)"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormLabel className="text-start">Kelas/Semester</FormLabel>
									<FormField
										control={form.control}
										name="kelas_semester"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input
														className="mb-5"
														disabled={isSubmitting}
														placeholder="Masukan Angka"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>Batal</AlertDialogCancel>
									<AlertDialogAction
										type="submit"
										disabled={!isValid || isSubmitting}
									>
										Buat surat
									</AlertDialogAction>
								</AlertDialogFooter>
							</form>
						</Form>
					</AlertDialogContent>
				</AlertDialog>
			</>
		</nav>
	);
};
