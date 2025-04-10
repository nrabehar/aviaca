import { CardWrapper } from '@/components/auth/card-wrapper';
import { RegisterForm } from '@/components/auth/register-form';

const LoginPage = () => {
	return (
		<CardWrapper
			className='w-full max-w-sm'
			headerLabel='Create an account'
			showSocialButtons
			showSocialButtonsLabel
			backButton
			backButtonLabel="Already have an account? login"
			backButtonHref='/login'
			socialButtonsLabel='Continue with'
		>
			<RegisterForm />
		</CardWrapper>
	);
};

export default LoginPage;
