'use client';

import { reset } from '@/actions/auth.action';
import { ResetSchema, ResetSchemaType } from '@/schemas/auth.schema';
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

export const ResetForm = () => {
	const [isPending, setTransition] = useTransition();
	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');

	const form = useForm<ResetSchemaType>({
		resolver: zodResolver(ResetSchema),
		defaultValues: {
			email: '',
		},
	});

	const onSubmit = (data: ResetSchemaType) => {
		setError('');
		setSuccess('');
		setTransition(() => {
			reset(data)
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
					name='email'
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email address</FormLabel>
							<FormControl>
								<Input
									placeholder='john.doe@example.com'
									type='email'
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
					Send reset email
				</Button>
			</form>
		</Form>
	);
};
