import { cn } from '@/lib/utils';
import {
    FaCheckCircle,
    FaExclamationTriangle,
    FaInfoCircle,
} from 'react-icons/fa';

interface FormHighlightProps {
	className?: string;
	message?: string;
	type: 'error' | 'success' | 'info';
}

export const FormHighlight = ({
	className,
	message,
	type,
}: FormHighlightProps) => {
	if (!message) return null;
	if (type !== 'error' && type !== 'success' && type !== 'info') {
		throw new Error('Invalid type prop. Expected "error", "success", or "info".');
	}
	return (
		<div
			className={cn(
				`w-full ${
					type === 'error'
						? 'bg-destructive/15 text-destructive dark:bg-red-300/20 dark:text-red-500'
						: type === 'success'
						? 'bg-emerald-300 text-emerald-500 dark:bg-green-300/20 dark:text-green-500'
						: type === 'info'
						? 'bg-blue-300 text-blue-500 dark:bg-blue-300/20 dark:text-blue-500'
						: ''
				} p-3 rounded-md items-center gap-x-2 text-sm font-medium flex`,
				className,
			)}
		>
			{type === 'error' && <FaExclamationTriangle className='h-4 w-4' />}
			{type === 'success' && <FaCheckCircle className='h-4 w-4' />}
			{type === 'info' && <FaInfoCircle className='h-4 w-4' />}
			<p>{message}</p>
		</div>
	);
};
