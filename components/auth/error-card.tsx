import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import Link from 'next/link';
import { FaChevronLeft, FaExclamationTriangle } from 'react-icons/fa';
import { Button } from '../ui/button';
import { Header } from './header';

export const ErrorCard = () => {
	return (
		<Card className='w-[566px] max-w-sm shadow-md'>
			<CardHeader>
				<Header label='Ooops! Something went wrong!' />
			</CardHeader>
			<CardContent className='flex flex-col items-center justify-center'>
				<FaExclamationTriangle className='text-5xl text-destructive mb-5' />
				<p className='text-sm text-muted-foreground'>
					We are sorry for the inconvenience.
				</p>
				<p className='text-sm text-muted-foreground'>Please try again later.</p>
			</CardContent>
			<CardFooter>
				<Button variant='outline' className='mt-4 w-full'>
					<FaChevronLeft className='mr-2' />
					<Link href='/login'>Back to Login</Link>
				</Button>
			</CardFooter>
		</Card>
	);
};
