'use client';

import { newVerification } from '@/actions/verification.action';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { FormHighlight } from '../form-highlight';
import { CardWrapper } from './card-wrapper';

export const NewVerificationForm = () => {
	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');

	const searchParams = useSearchParams();
	const token = searchParams.get('token');

	const onSubmit = useCallback(() => {
		if (!token) {
			return;
		}
		newVerification(token)
			.then((res) => {
				if (res.success) {
					setSuccess(res.message);
					setTimeout(() => {
						window.location.href = '/login';
					}, 2000);
				} else {
					setError(res.message);
					setTimeout(() => {
						window.location.href = '/login';
					}, 2000);
				}
			})
			.catch((err) => {
				setError(
					'An error occurred while verifying your email. Please try again.',
				);
				console.error(err);
			});
	}, [token]);

	useEffect(() => {
		onSubmit();
	}, [onSubmit]);

	return (
		<CardWrapper
			headerLabel='Confirm your verification'
			backButton
			backButtonLabel='Back to login'
			backButtonHref='/login'
		>
			<div className='flex items-center w-full justify-center'>
				<FormHighlight type='error' message={error} />
				<FormHighlight type='success' message={success} />
				{!error && !success && (
					<BeatLoader
						className='mt-4'
						color='#3b82f6'
						loading={true}
						size={15}
						speedMultiplier={1.5}
					/>
				)}
			</div>
		</CardWrapper>
	);
};
