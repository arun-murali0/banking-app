import Sidebars from '@/components/Sidebars';
import Image from 'next/image';
import { ReactNode } from 'react';
import MobileNavbar from '@/components/MobileNavbar';
import RightSidebar from '@/components/RightSidebar';

export default function layout({ children }: { children: ReactNode }) {
	const isLogged = { firstName: 'Arun', email: 'arun@gmail.com', lastName: 'karthick' };

	return (
		<main className="flex h-screen w-full font-inter">
			<Sidebars user={isLogged.firstName} />
			<div className="flex flex-col size-full">
				<div className="root-layout">
					<Image src={'/icons/logo.svg'} width={20} height={20} alt="menu-icon" />
					<div>
						<MobileNavbar user={isLogged.firstName} banks={[{}]} />
					</div>
				</div>
				{children}
			</div>
			<RightSidebar user={isLogged} />
		</main>
	);
}
