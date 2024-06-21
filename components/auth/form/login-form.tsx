'use client';

import { useState, useTransition } from 'react';

import { Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { login } from '@/actions/auth/login';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';

const FormSchema = z.object({
	email: z.string().email({ message: 'Must be a valid email address' }),
	password: z.string().nonempty('This is required').min(5, {
		message: 'At least 5 characters',
	}),
});

export const LoginForm = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = (values: z.infer<typeof FormSchema>) => {
		setError('');
		setSuccess('');
		startTransition(() => {
			login(values)
				.then((data) => {
					if (data?.error) {
						form.reset();
						setError(data.error);
					}
					if (data?.success) {
						form.reset();
						setSuccess(data.success);
					}
				})
				.catch(() => {
					setError('Something went wrong');
				});
		});
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-4"
			>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder="Email"
									type="email"
									className="p-2 mt-8 rounded-xl border"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem className="relative">
							<FormControl>
								<Input
									placeholder="Password"
									type={showPassword ? 'text' : 'password'}
									className="p-2 rounded-xl border w-full"
									{...field}
								/>
							</FormControl>
							<Button
								variant="ghost"
								className="absolute hover:bg-inherit right-0 -top-2 text-gray-400 text-sm"
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? (
									<Eye className="w-4 h-4" />
								) : (
									<EyeOff className="w-4 h-4" />
								)}
							</Button>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					type="submit"
					className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
				>
					Login
				</Button>
			</form>
		</Form>
	);
};
