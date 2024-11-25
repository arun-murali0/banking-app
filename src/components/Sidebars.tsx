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
			<nav className="flex flex-col gap-4">
				<Link href={'/'} className="flex mb-12 gap-2 items-center">
					<Image src={'icons/logo.svg'} alt="Logo" width={30} height={30} />
					<h1 className="sidebar-logo">swift</h1>
				</Link>
				{sidebarLinks.map((links) => {
					const isActive = pathName === links.route || pathName?.startsWith(`${links.route}/`);

					return (
						<Link
							key={links.label}
							href={links.route}
							className={cn('sidebar-link', { 'bg-bank-gradient': isActive })}
						>
							<div className="relative size-6">
								<Image
									src={links.imgURL}
									alt={links.label}
									fill
									className={cn({ 'brightness-[3] invert-0': isActive })}
								/>
							</div>
							<p className={cn('sidebar-label', { '!text-white': isActive })}>{links.label}</p>
						</Link>
					);
				})}
			</nav>
		</section>
	);
};

export default Sidebars;
