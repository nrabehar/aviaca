'use client';

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Header } from './header';
import { Social } from './social';

interface CardWrapperProps {
	children: React.ReactNode;
	className?: string;
	headerLabel?: string;
	backButton?: boolean;
	backButtonLabel?: string;
	backButtonHref?: string;
	showSocialButtons?: boolean;
	showSocialButtonsLabel?: boolean;
	socialButtonsLabel?: string;
}

export const CardWrapper = ({
	children,
	className = '',
	headerLabel,
	backButton,
	backButtonLabel,
	backButtonHref,
	showSocialButtons,
	showSocialButtonsLabel,
	socialButtonsLabel = 'Continue with',
}: CardWrapperProps) => {
	return (
		<Card className={cn(`w-[566px] shadow-md ${className}`)}>
			<CardHeader>
				<Header label={headerLabel} />
			</CardHeader>
			<CardContent className='flex flex-col gap-y-4 items-center justify-center'>
				{children}
			</CardContent>
			{showSocialButtons && (
				<CardFooter>
					<Social
						showLabel={showSocialButtonsLabel}
						labelPrefix={socialButtonsLabel}
					/>
				</CardFooter>
			)}
			{backButton && (
				<CardFooter>
					<Button className='w-full' variant='link' asChild>
						<Link href={backButtonHref || '/'}>{backButtonLabel}</Link>
					</Button>
				</CardFooter>
			)}
		</Card>
	);
};
