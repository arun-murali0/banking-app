import type { Metadata } from 'next';
import { Inter, IBM_Plex_Serif } from 'next/font/google';
import './globals.css';
import { ReactNode, FC } from 'react';
import { AuthProvider } from '@/hooks/useAuth';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const ibmPlexSerif = IBM_Plex_Serif({
	subsets: ['latin'],
	variable: '--font-imb-plex-serif',
	weight: ['400', '700'],
});

export const metadata: Metadata = {
	title: 'Swift Bank',
	description:
		'SwiftBank is a modern banking solution designed for secure account management, seamless transactions, and real-time financial insights. Built to simplify and innovate your banking experience.',
	icons: './icons/logo.svg',
};

// Root Component
const RootLayoutComponent: FC<{ children: ReactNode }> = ({ children }, className: string) => {
	return <div className={`${inter.variable} ${ibmPlexSerif.variable}`}>{children}</div>;
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<RootLayoutComponent>
					<AuthProvider>{children}</AuthProvider>
				</RootLayoutComponent>
			</body>
		</html>
	);
}
