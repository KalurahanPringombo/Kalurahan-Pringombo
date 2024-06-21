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
	pendidikan_kk: z.string().min(1),
});

export const EditPendidikanKk = ({ initialData, nik }: Props) => {
	const [isPending, startTransition] = useTransition();
	const [isEditing, setIsEditing] = useState(false);

	const toggleEdit = () => setIsEditing((current) => !current);

	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			pendidikan_kk: initialData.pendidikan_kk || '',
		},
	});

	const { isSubmitting, isValid } = form.formState;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			values.pendidikan_kk = values.pendidikan_kk.toUpperCase();
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
				Pendidikan dalam KK
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
						!initialData.pendidikan_kk && 'text-slate-500 italic'
					)}
				>
					{!initialData.pendidikan_kk
						? 'Tidak diketahui'
						: initialData.pendidikan_kk}
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
							name="pendidikan_kk"
							render={({ field }) => (
								<FormItem>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Pilih Pendidikan dalam KK" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="TIDAK / BELUM SEKOLAH">
												TIDAK / BELUM SEKOLAH
											</SelectItem>
											<SelectItem value="BELUM TAMAT SD/SEDERAJAT">
												BELUM TAMAT SD/SEDERAJAT
											</SelectItem>
											<SelectItem value="TAMAT SD / SEDERAJAT">
												TAMAT SD / SEDERAJAT
											</SelectItem>
											<SelectItem value="SLTP/SEDERAJAT">
												SLTP/SEDERAJAT
											</SelectItem>
											<SelectItem value="SLTA / SEDERAJAT">
												SLTA / SEDERAJAT
											</SelectItem>
											<SelectItem value="DIPLOMA I / II">
												DIPLOMA I / II
											</SelectItem>
											<SelectItem value="AKADEMI/ DIPLOMA III/S. MUDA">
												AKADEMI/ DIPLOMA III/S. MUDA
											</SelectItem>
											<SelectItem value="DIPLOMA IV/ STRATA I">
												DIPLOMA IV/ STRATA I
											</SelectItem>
											<SelectItem value="STRATA II">STRATA II</SelectItem>
											<SelectItem value="STRATA III">STRATA III</SelectItem>
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
