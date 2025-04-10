'use client';

import { login } from '@/actions/auth.action';
import { LoginSchema, LoginSchemaType } from '@/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
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
	const searchParams = useSearchParams();
	const urlError =
		searchParams.get('error') === 'OAuthAccountNotLinked'
			? 'Email already linked to another account'
			: '';

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
			login(data)
				.then((res) => {
					if (res?.success) {
						setSuccess(res.message);
					} else {
						setError(res?.message);
					}
				})
				.catch((err) => {
					setError('Something went wrong');
					console.error(err);
				})
				.finally(() => {
					console.log('Login process finished');
				});
		});
	};

	return (
		<Form {...form}>
			<form className='w-full space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
				<FormHighlight type='error' message={error || urlError} />
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
				<Button size={'sm'} variant={'link'} asChild className='px-0 font-normal'>
					<Link href='/auth/reset'>Forgot password?</Link>
				</Button>
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
