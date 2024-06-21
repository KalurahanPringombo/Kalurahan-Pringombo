'use client';

import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

import { Penduduk } from '@prisma/client';
import { Pencil } from 'lucide-react';

import { editDataPenduduk } from '@/actions/penduduk/penduduk-actions';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

interface Props {
	initialData: Penduduk;
	nik: string;
}

const formSchema = z.object({
	status_kawin: z.string().min(1),
});

export const EditStatusKawin = ({ initialData, nik }: Props) => {
	const [isPending, startTransition] = useTransition();
	const [isEditing, setIsEditing] = useState(false);

	const toggleEdit = () => setIsEditing((current) => !current);

	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			status_kawin: initialData.status_kawin || '',
		},
	});

	const { isSubmitting, isValid } = form.formState;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			values.status_kawin = values.status_kawin.toUpperCase();
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
				Status Perawinan
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
						!initialData.status_kawin && 'text-slate-500 italic'
					)}
				>
					{!initialData.status_kawin
						? 'Tidak diketahui'
						: initialData.status_kawin}
				</div>
			)}
			{isEditing && (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4 mt-4"
					>
						<FormField
							control={form.control}
							name="status_kawin"
							render={({ field }) => (
								<FormItem>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Pilih Status Perkawinan" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="KAWIN">KAWIN</SelectItem>
											<SelectItem value="BELUM KAWIN">BELUM KAWIN</SelectItem>
											<SelectItem value="CERAI HIDUP">CERAI HIDUP</SelectItem>
											<SelectItem value="CERAI MATI">CERAI MATI</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex items-center gap-x-2">
							<Button
								disabled={!isValid || isSubmitting || isPending}
								type="submit"
							>
								Simpan
							</Button>
						</div>
					</form>
				</Form>
			)}
		</div>
	);
};
