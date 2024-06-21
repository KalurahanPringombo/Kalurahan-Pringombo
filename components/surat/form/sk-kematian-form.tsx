'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

import { timeZoneFormatString } from '@/lib/formats/time-zone';
import { cn } from '@/lib/utils';

import { CalendarIcon } from 'lucide-react';

import { createPengantarSkck } from '@/actions/surat/pengantar-skck';
import { createSkKematian } from '@/actions/surat/sk-kematian';

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
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';

const formSchema = z.object({
	pendudukId: z.string().min(1),
	no_surat: z.string().min(1),
	lokasi_meninggal: z.string().min(1),
	tanggal_kematian: z.date(),
	anak_ke: z.coerce.number().min(1),
});

export const SkKematianForm = () => {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			pendudukId: '',
			no_surat: '',
			lokasi_meninggal: '',
			tanggal_kematian: new Date(),
			anak_ke: undefined,
		},
	});

	const { isSubmitting, isValid } = form.formState;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			values.pendudukId = btoa(values.pendudukId);
			values.no_surat = btoa(values.no_surat);
			values.lokasi_meninggal = values.lokasi_meninggal.toUpperCase();
			startTransition(() => {
				createSkKematian(values).then((response) => {
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
					SURAT KETERANGAN KEMATIAN
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
										Buat Surat Kematian
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
									<FormLabel className="text-start">NIK</FormLabel>
									<FormField
										control={form.control}
										name="pendudukId"
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
									<FormLabel className="text-start">Lokasi Meninggal</FormLabel>
									<FormField
										control={form.control}
										name="lokasi_meninggal"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input
														className="mb-5"
														disabled={isSubmitting}
														placeholder="Lokasi meninggal"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormLabel className="text-start">Tanggal Kematian</FormLabel>
									<FormField
										control={form.control}
										name="tanggal_kematian"
										render={({ field }) => (
											<FormItem>
												<Popover>
													<PopoverTrigger asChild>
														<FormControl>
															<Button
																variant={'outline'}
																className={cn(
																	'w-full pl-3 text-left font-normal',
																	!field.value && 'text-muted-foreground'
																)}
															>
																{field.value ? (
																	timeZoneFormatString(field.value)
																) : (
																	<span>Pilih tanggal</span>
																)}
																<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
															</Button>
														</FormControl>
													</PopoverTrigger>
													<PopoverContent className="w-auto p-0" align="start">
														<Calendar
															mode="single"
															selected={field.value}
															onSelect={field.onChange}
															disabled={(date) =>
																date > new Date() ||
																date < new Date('1900-01-01')
															}
															initialFocus
														/>
													</PopoverContent>
												</Popover>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormLabel className="text-start">Anak Ke</FormLabel>
									<FormField
										control={form.control}
										name="anak_ke"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input
														type="number"
														className="mb-5"
														disabled={isSubmitting}
														placeholder="Anak ke"
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
										disabled={!isValid || isSubmitting || isPending}
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
