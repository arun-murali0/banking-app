'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Form from './Form';

const AuthForm = ({ type }: { type: string }) => {
	const [user, setUser] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	return (
		<section className="auth-form">
			<header className="flex flex-col gap-5 md:gap-8">
				<Link href={'/'} className="flex gap-1 cursor-pointer items-center">
					<Image src={'icons/logo.svg'} alt="Logo" width={30} height={30} />
					<h1 className="sidebar-logo">Swift</h1>
				</Link>
				<div className="flex flex-col gap-1 md:gap-2">
					<div className="text-20 lg:text-36 font-semibold text-gray-800 font-ibm-plex-serif">
						{user ? 'Link account' : type === 'login' ? 'Sign-In' : 'Sign-Up'}
					</div>
					<div className="text-14 text-gray-500 font-normal">
						{user ? 'Link your Account to get started' : 'Please enter your details'}
					</div>
				</div>
			</header>
			{user ? (
				<div className="flex flex-col gap-4"></div>
			) : (
				<>
					<Form user={user} isLoading={isLoading} type={type} />
				</>
			)}
		</section>
	);
};

export default AuthForm;
