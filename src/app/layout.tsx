import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: 'Banking Application',
	description: 'Banking application for payment ',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
