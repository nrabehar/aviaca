import { CardWrapper } from '@/components/auth/card-wrapper';
import { LoginForm } from '@/components/auth/login-form';
import { Suspense } from 'react';

const LoginPage = () => {
	return (
		<CardWrapper
			className='w-full max-w-sm'
			headerLabel='Welcome back'
			showSocialButtons
			showSocialButtonsLabel
			backButton
			backButtonLabel="Don't have an account? create one"
			backButtonHref='/register'
			socialButtonsLabel='Login with'
		>
			<Suspense>
				<LoginForm />
			</Suspense>
		</CardWrapper>
	);
};

export default LoginPage;
