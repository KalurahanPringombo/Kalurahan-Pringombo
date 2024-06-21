'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

import { CalendarIcon } from 'lucide-react';

import { timeZoneFormatWithTimeString } from '@/lib/formats/time-zone';
import { cn } from '@/lib/utils';

import { createIzinKeramaian } from '@/actions/surat/izin-keramaian';

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
import { ScrollArea } from '@/components/ui/scroll-area';
import { TimePickerDemo } from '@/components/ui/time-picker-demo';

const formSchema = z.object({
	pendudukId: z.string().min(1),
	no_surat: z.string().min(1),
	keperluan_keramaian: z.string().min(1),
	jenis_keramaian: z.string().min(1),
	waktu_keramaian: z.date(),
	tempat_keramaian: z.string().min(1),
	lama_keramaian: z.string().min(1),
});

export const IzinKeramaianForm = () => {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			pendudukId: '',
			no_surat: '',
			keperluan_keramaian: '',
			jenis_keramaian: '',
			waktu_keramaian: new Date(),
			tempat_keramaian: '',
			lama_keramaian: '',
		},
	});

	const { isSubmitting, isValid } = form.formState;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			values.pendudukId = btoa(values.pendudukId);
			values.no_surat = btoa(values.no_surat);
			values.keperluan_keramaian = values.keperluan_keramaian.toUpperCase();
			startTransition(() => {
				createIzinKeramaian(values).then((response) => {
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
				<h1 className="font-bold text-xl text-sky-700">SURAT IZIN KERAMAIAN</h1>

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
										Buat Surat Izin Keramaian
									</AlertDialogTitle>
									<ScrollArea className="h-[400px] w-full rounded-md border p-4">
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
										<FormLabel className="text-start">NIK Pemohon</FormLabel>
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
										<FormLabel className="text-start">
											Keperluan_keramaian
										</FormLabel>
										<FormField
											control={form.control}
											name="keperluan_keramaian"
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<Input
															className="mb-5"
															disabled={isSubmitting}
															placeholder="Tambahkan Keperluan_keramaian"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormLabel className="text-start">
											Jenis Keramaian
										</FormLabel>
										<FormField
											control={form.control}
											name="jenis_keramaian"
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<Input
															className="mb-5"
															disabled={isSubmitting}
															placeholder="Tambahkan Keperluan_keramaian"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormLabel className="text-start">
											Tanggal Keramaian
										</FormLabel>
										<FormField
											control={form.control}
											name="waktu_keramaian"
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
																		timeZoneFormatWithTimeString(field.value)
																	) : (
																		<span>Pilih tanggal</span>
																	)}
																	<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
																</Button>
															</FormControl>
														</PopoverTrigger>
														<PopoverContent
															className="w-auto p-0"
															align="start"
														>
															<Calendar
																className="w-[400px]"
																mode="single"
																selected={field.value}
																onSelect={field.onChange}
																disabled={(date) => date < new Date()}
																initialFocus
															/>
															<div className="p-3 border-t border-border">
																<TimePickerDemo
																	setDate={field.onChange}
																	date={field.value}
																/>
															</div>
														</PopoverContent>
													</Popover>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormLabel className="text-start">
											Tempat Keramaian
										</FormLabel>
										<FormField
											control={form.control}
											name="tempat_keramaian"
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<Input
															className="mb-5"
															disabled={isSubmitting}
															placeholder="Tambahkan Keperluan_keramaian"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormLabel className="text-start">Nama Keramaian</FormLabel>
										<FormField
											control={form.control}
											name="lama_keramaian"
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<Input
															className="mb-5"
															disabled={isSubmitting}
															placeholder="Tambahkan Keperluan_keramaian"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</ScrollArea>
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
