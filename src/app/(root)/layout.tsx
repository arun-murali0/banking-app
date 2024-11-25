import Sidebars from '@/components/Sidebars';
import { ReactNode } from 'react';

export default function layout({ children }: { children: ReactNode }) {
	const isLogged = { firstName: 'Arun' };

	return (
		<main className="flex h-screen w-full font-inter">
			<Sidebars user={isLogged.firstName} />
			{children}
		</main>
	);
}
