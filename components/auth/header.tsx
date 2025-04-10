import Logo from '@/assets/aviaca.png';
import Image from 'next/image';

interface HeaderProps {
	label?: string;
}

export const Header = ({ label }: HeaderProps) => {
	return (
		<div className='w-full flex flex-col gap-y-4 items-center justify-center'>
			<div className='flex gap-y-2 items-center justify-center gap-2'>
				<Image
					src={Logo.src}
					alt='Logo'
					width={45}
					height={45}
					className='pointer-events-none'
				/>
				<h1 className='text-3xl font-bold text-center bg-gradient-to-r from-red-500 to-blue-500 text-transparent bg-clip-text'>
					Aviaca
				</h1>
			</div>
			<p className='text-2xl font-semibold text-muted-foreground'>{label}</p>
		</div>
	);
};
