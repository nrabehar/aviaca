'use client';

import { login } from '@/actions/auth';
import { LoginSchema, LoginSchemaType } from '@/schemas/auth';
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

export const LoginForm = () => {
	const [isPending, setTransition] = useTransition();
	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');

	const form = useForm<LoginSchemaType>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			identifier: '',
			password: '',
		},
	});


	const onSubmit = (data: LoginSchemaType) => {
		setError('');
		setSuccess('');
		setTransition(() => {
			login(data).then((res) => {
				if (res.success) {
					setSuccess(res.message);
				} else {
					setError(res.message);
				}
			});
		});
	};

	return (
		<Form {...form}>
			<form className='w-full space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
				<FormHighlight type='error' message={error} />
				<FormHighlight type='success' message={success} />
				<FormHighlight type='info' message='' />
				<FormField
					name='identifier'
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username or Email address</FormLabel>
							<FormControl>
								<Input
									placeholder='Enter your email or username'
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
					Login
				</Button>
			</form>
		</Form>
	);
};
