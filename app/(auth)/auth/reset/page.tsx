import { CardWrapper } from "@/components/auth/card-wrapper"
import { ResetForm } from "@/components/auth/reset-form"

const ResetPage = () => {
	return (

				<CardWrapper
					className='w-full max-w-sm'
					headerLabel='Forgot your password?'
					backButton
					backButtonLabel="Back to login"
					backButtonHref='/login'
				>
					<ResetForm />
				</CardWrapper>
	)
}

export default ResetPage