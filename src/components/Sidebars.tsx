'use client';
import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebars = ({ user }: SiderbarProps) => {
	const pathName = usePathname();

	return (
		<section className="sidebar">
			<nav>
				<Link href={'/'} className="flex flex-col gap-5">
					<Image src={'icons/logo.svg'} alt="Logo" width={30} height={30} />
					<h1 className="sidebar-logo">swift</h1>
				</Link>
				{sidebarLinks.map((links) => {
					const isActive = pathName === links.route || pathName?.startsWith(`${links.route}/`);
					console.log(isActive);

					return (
						<Link
							key={links.label}
							href={links.route}
							className={cn('sidebar-links', { 'bg-bank-gradient': isActive })}
						>
							<div>{links.label}</div>
						</Link>
					);
				})}
			</nav>
		</section>
	);
};

export default Sidebars;
