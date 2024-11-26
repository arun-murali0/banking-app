'use client';

import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
	SheetDescription,
} from '@/components/ui/sheet';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { sidebarLinks } from '@/constants';

const MobileNavbar = ({ user }: MobileNavProps) => {
	const pathName = usePathname();

	return (
		<section className="w-full max-w-[264px]">
			<Sheet>
				<SheetTrigger className="right-2">
					<Image
						src={'/icons/hamburger.svg'}
						alt="humberIcons"
						width={20}
						height={20}
						className="cursor-pointer"
					/>
				</SheetTrigger>
				<SheetContent side="left" className="border-none bg-white">
					<div className="flex flex-col gap-4">
						<SheetDescription title='open'>
							<Link href={'/'} className="flex mb-12 gap-1 p-4 items-center">
								<Image src={'icons/logo.svg'} alt="Logo" width={26} height={26} />
								<div className="text-26 font-ibm-plex-serif mx-2 font-bold text-black-1">swift</div>
							</Link>
							<div className="mabilenav-sheet">
								<SheetClose asChild>
									<nav className="flex flex-col gap-4 h-full pt-6 text-white">
										{sidebarLinks.map((links) => {
											const isActive =
												pathName === links.route || pathName?.startsWith(`${links.route}/`);
											return (
												<SheetClose asChild key={links.route}>
													<Link
														key={links.label}
														href={links.route}
														className={cn('mobilenav-sheet_close w-full', {
															'bg-bank-gradient': isActive,
														})}
													>
														<Image
															src={links.imgURL}
															alt={links.label}
															height={20}
															width={20}
															className={cn({ 'brightness-[3] invert-0': isActive })}
														/>
														<div className={cn('text-16 font-semibold text-black-2', {
																'text-white': isActive,
															})}
														>
															{links.label}
														</div>
													</Link>
												</SheetClose>
											);
										})}
									</nav>
								</SheetClose>
							</div>
						</SheetDescription>
					</div>
				</SheetContent>
			</Sheet>
		</section>
	);
};

export default MobileNavbar;
