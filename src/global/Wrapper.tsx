import { FC, ReactElement } from 'react';

interface wrapperProps {
	children: ReactElement;
	className?: string;
}

export const Wrapper: FC<wrapperProps> = ({ children, className }) => {
	return (
		<>
			<div className={`${className} h-full w-full container relative max-w-5xl`}>{children}</div>
		</>
	);
};
