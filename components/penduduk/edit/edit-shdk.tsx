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
	shdk: z.string().min(1),
});

export const EditShdk = ({ initialData, nik }: Props) => {
	const [isPending, startTransition] = useTransition();
	const [isEditing, setIsEditing] = useState(false);

	const toggleEdit = () => setIsEditing((current) => !current);

	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			shdk: initialData.shdk || '',
		},
	});

	const { isSubmitting, isValid } = form.formState;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			values.shdk = values.shdk.toUpperCase();
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
				SHDK
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
						!initialData.shdk && 'text-slate-500 italic'
					)}
				>
					{!initialData.shdk ? 'Tidak diketahui' : initialData.shdk}
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
							name="shdk"
							render={({ field }) => (
								<FormItem>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Pilih SHDK" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="ANAK">ANAK</SelectItem>
											<SelectItem value="CUCU">CUCU</SelectItem>
											<SelectItem value="FAMILI LAIN">FAMILI LAIN</SelectItem>
											<SelectItem value="ISTRI">ISTRI</SelectItem>
											<SelectItem value="KEPALA KELUARGA">
												KEPALA KELUARGA
											</SelectItem>
											<SelectItem value="LAINNYA">LAINNYA</SelectItem>
											<SelectItem value="MENANTU">MENANTU</SelectItem>
											<SelectItem value="MERTUA">MERTUA</SelectItem>
											<SelectItem value="ORANG TUA">ORANG TUA</SelectItem>
											<SelectItem value="PEMBANTU">PEMBANTU</SelectItem>
											<SelectItem value="SUAMI">SUAMI</SelectItem>
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
