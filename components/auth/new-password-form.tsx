'use client';

import { newPassword } from '@/actions/auth.action';
import { passwordResetVerification } from '@/actions/verification.action';
import { PasswordSchema, PasswordSchemaType } from '@/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { redirect, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { BeatLoader } from 'react-spinners';
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
import { CardWrapper } from './card-wrapper';

export const NewPasswordForm = () => {
	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');

	const [isPending, setTransition] = useTransition();

	const searchParams = useSearchParams();
	const token = searchParams.get('token');

	const form = useForm<PasswordSchemaType>({
		resolver: zodResolver(PasswordSchema),
		defaultValues: {
			password: '',
			confirmPassword: '',
			token: token || '',
		},
	});

	const checkToken = useCallback(() => {
		if (!token) {
			setError('Token not found');
			setTimeout(() => {
				redirect('/login');
			}, 2000);
			return;
		}
		passwordResetVerification(token)
			.then((res) => {
				if (!res.success) {
					setError(res.message);
					setSuccess(undefined);
				}
			})
			.catch((err) => {
				setError(
					'An error occurred while verifying your email. Please try again.',
				);
				console.error(err);
			});
	}, []);

	const onSubmit = (data: PasswordSchemaType) => {
		console.log('data', data);
		setTransition(() => {
			newPassword(data)
				.then((res) => {
					if (res.success) {
						setSuccess(res.message);
						setError(undefined);
						setTimeout(() => {
							redirect('/login');
						}, 2000);
					} else {
						setError(res.message);
						setSuccess(undefined);
					}
				})
				.catch((err) => {
					setError('Something went wrong');
					console.error(err);
				});
		});
	};

	useEffect(() => {
		checkToken();
	}, []);

	return (
		<CardWrapper
			headerLabel='Change your password'
			backButton
			backButtonLabel='Back to login'
			backButtonHref='/login'
		>
			<Form {...form}>
				<form
					className='w-full space-y-4'
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FormHighlight type='error' message={error} />
					<FormHighlight type='success' message={success} />
					<FormField
						name='password'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>New password</FormLabel>
								<FormControl>
									<Input
										placeholder='********'
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
						name='confirmPassword'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirm your password</FormLabel>
								<FormControl>
									<Input
										placeholder='********'
										type='text'
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
						{!isPending ? 'Change password' : <BeatLoader />}
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};
