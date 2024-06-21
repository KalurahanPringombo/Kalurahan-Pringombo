'use client';

import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

import { Penduduk } from '@prisma/client';
import { CalendarIcon, Pencil } from 'lucide-react';

import { editDataPenduduk } from '@/actions/penduduk/penduduk-actions';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { timeZoneFormatString } from '@/lib/formats/time-zone';

interface Props {
	initialData: Penduduk;
	nik: string;
}

const formSchema = z.object({
	tanggal_lahir: z.date(),
});

export const EditTanggalLahir = ({ initialData, nik }: Props) => {
	const [isPending, startTransition] = useTransition();
	const [isEditing, setIsEditing] = useState(false);

	const toggleEdit = () => setIsEditing((current) => !current);

	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			tanggal_lahir: initialData.tanggal_lahir || undefined,
		},
	});

	const { isSubmitting, isValid } = form.formState;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			startTransition(() => {
				editDataPenduduk(nik, values).then((response) => {
					if (response.data === null) {
						toast.error(response.message);
					} else {
						toast.success(response.message);
						toggleEdit();
						router.refresh();
					}
				});
			});
		} catch {
			toast.error('Gagal mengedit');
		}
	};
	return (
		<div className="mt-6 border bg-slate-100 rounded-md p-4">
			<div className="font-medium flex items-center justify-between">
				Tanggal Lahir
				<Button onClick={toggleEdit} variant="ghost">
					{isEditing ? (
						<>Batal</>
					) : (
						<>
							<Pencil className="h-4 w-4 mr-2" />
							Edit
						</>
					)}
				</Button>
			</div>
			{!isEditing && (
				<div
					className={cn(
						'text-sm mt-2',
						!initialData.tanggal_lahir && 'text-slate-500 italic'
					)}
				>
					{!initialData.tanggal_lahir
						? 'Tidak diketahui'
						: timeZoneFormatString(initialData.tanggal_lahir)}
				</div>
			)}
			{isEditing && (
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="tanggal_lahir"
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
													date > new Date() || date < new Date('1900-01-01')
												}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							disabled={!isValid || isSubmitting || isPending}
						>
							Simpan
						</Button>
					</form>
				</Form>
			)}
		</div>
	);
};
