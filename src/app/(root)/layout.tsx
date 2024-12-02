import Sidebars from '@/components/Sidebars';
import Image from 'next/image';
import { ReactNode } from 'react';
import MobileNavbar from '@/components/MobileNavbar';
import RightSidebar from '@/components/RightSidebar';
import { getLoggedInUser } from '@/server-actions/Appwrite.action';

export default async function layout({ children }: { children: ReactNode }) {
	const isLogged = await getLoggedInUser();

	return (
		<main className="flex h-screen w-full font-inter">
			<Sidebars user={isLogged} />
			<div className="flex flex-col size-full">
				<div className="root-layout">
					<Image src={'/icons/logo.svg'} width={20} height={20} alt="menu-icon" />
					<div>
						<MobileNavbar user={isLogged} />
					</div>
				</div>
				{children}
			</div>
			<RightSidebar user={isLogged} transactions={[]} banks={[]} />
		</main>
	);
}
