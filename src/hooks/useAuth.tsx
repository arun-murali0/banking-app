'use client';

import { useContext, createContext, useState, Dispatch, SetStateAction, ReactNode } from 'react';

type contextProp = {
	user: any | null;
	setUser: Dispatch<SetStateAction<any | null>>;
};

const userContext = createContext<contextProp>({
	user: null,
	setUser: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<any | null>(null);

	return <userContext.Provider value={{ user, setUser }}>{children}</userContext.Provider>;
};

export const useAuth = () => useContext(userContext);
