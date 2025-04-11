'use client';

import { socialLogin } from '@/actions/auth.action';
import { cn } from '@/lib/utils';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '../ui/button';

interface SocialButtonProps {
	showLabel?: boolean;
	labelPrefix?: string;
}

export const Social = ({
	showLabel,
	labelPrefix: label,
}: SocialButtonProps) => {
	const onClick = (provider: 'google' | 'github') => {
		socialLogin(provider);
	};

	return (
		<div
			className={cn(`w-full
		flex ${showLabel && `flex-col`} ${showLabel ? 'gap-2' : 'gap-x-2'} items-center
			`)}
		>
			<Button
				size='lg'
				className={cn(`${!showLabel ? 'w-1/2' : 'w-full'} cursor-pointer`)}
				variant='outline'
				onClick={() => onClick('google')}
			>
				{showLabel && `${label} Google`}
				<FcGoogle className='h-5 w-5' />
			</Button>
			<Button
				size='lg'
				className={cn(`${!showLabel ? 'w-1/2' : 'w-full cursor-pointer'}`)}
				variant='outline'
				onClick={() => onClick('github')}
			>
				{showLabel && `${label} Github`}
				<FaGithub className='h-5 w-5' />
			</Button>
		</div>
	);
};
