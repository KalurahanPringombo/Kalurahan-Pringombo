'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

import { updateJabatanDiKalurahan } from '@/actions/penduduk/penduduk-actions';

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
	nik: z.string().min(5),
});

type Props = {
	jabatan: string;
	trigger: string;
	title: string;
};

export const UpdateJabatanForm = ({ jabatan, trigger, title }: Props) => {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			nik: '',
		},
	});

	const { isSubmitting, isValid } = form.formState;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			values.nik = btoa(values.nik);
			startTransition(() => {
				updateJabatanDiKalurahan(jabatan, values).then((response) => {
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
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button className="bg-sky-600 hover:bg-sky-600/80">{trigger}</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="text-center">
						Update {title}
					</AlertDialogTitle>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
							<FormLabel className="text-start">
								NIK <strong className="text-sky-600">{title}</strong> baru
							</FormLabel>
							<FormField
								control={form.control}
								name="nik"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												className="mb-5 mt-2"
												disabled={isSubmitting}
												placeholder="34**************"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex space-x-4 justify-end">
								<AlertDialogCancel>Batal</AlertDialogCancel>
								<AlertDialogAction
									className="bg-sky-600"
									type="submit"
									disabled={!isValid || isSubmitting || isPending}
								>
									Ganti
								</AlertDialogAction>
							</div>
						</form>
					</Form>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
