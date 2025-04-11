'use client';

import { register } from '@/actions/auth.action';
import { RegisterSchema, RegisterSchemaType } from '@/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { FormHighlight } from '../form-highlight';
import { Button } from '../ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

export const RegisterForm = () => {
	const [isPending, setTransition] = useTransition();
	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');

	const form = useForm<RegisterSchemaType>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	});

	const onSubmit = (data: RegisterSchemaType) => {
		setError('');
		setSuccess('');
		setTransition(() => {
			register(data).then((res) => {
				if (res.success) {
					setSuccess(res.message);
					setError('');
				} else {
					setError(res.message);
					setSuccess('');
				}
			});
		});
	};

	return (
		<Form {...form}>
			<form className='w-full space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
				<FormHighlight type='error' message={error} />
				<FormHighlight type='success' message={success} />
				<FormField
					name='name'
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input
									placeholder='Enter your name'
									type='text'
									disabled={isPending}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name='email'
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									placeholder='Enter your email'
									type='email'
									disabled={isPending}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name='password'
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									placeholder='********'
									type='password'
									disabled={isPending}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type='submit'
					className='w-full cursor-pointer'
					disabled={isPending}
				>
					Create account
				</Button>
			</form>
		</Form>
	);
};
