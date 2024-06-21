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
import { Input } from '@/components/ui/input';

interface Props {
	initialData: Penduduk;
	nik: string;
}

const formSchema = z.object({
	padukuhan: z.string().min(1),
});

export const EditPadukuhan = ({ initialData, nik }: Props) => {
	const [isPending, startTransition] = useTransition();
	const [isEditing, setIsEditing] = useState(false);

	const toggleEdit = () => setIsEditing((current) => !current);

	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			padukuhan: initialData.padukuhan || '',
		},
	});

	const { isSubmitting, isValid } = form.formState;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			values.padukuhan = values.padukuhan.toUpperCase();
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
				Padukuhan
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
						!initialData.padukuhan && 'text-slate-500 italic'
					)}
				>
					{!initialData.padukuhan ? 'Tidak diketahui' : initialData.padukuhan}
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
							name="padukuhan"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											disabled={isSubmitting}
											placeholder="Masukan Padukuhan"
											{...field}
										/>
									</FormControl>
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
