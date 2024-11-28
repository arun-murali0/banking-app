import Image from 'next/image';
import { ReactNode } from 'react';

export default function layout({ children }: { children: ReactNode }) {
	return (
		<main className="flex justify-between min-h-screen w-full font-inter">
			{children}
			<div className='auth-asset'>
				<Image src={'/icons/auth-image.svg'} alt='auth-image' width={500} height={500} />
			</div>
		</main>
	);
}
