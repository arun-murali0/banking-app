'use server';

import { createAdminClient, createSessionClient } from '@/lib/server/Appwrite';
import { parseStringify } from '@/lib/utils';  //parsing a json data
import { cookies } from 'next/headers';
import { ID } from 'node-appwrite';

// new User
export const registerNewUser = async (userData: SignUpParams) => {
	const { email, password, firstname, lastname } = userData;

	try {
		const { account } = await createAdminClient();

		const newUser = await account.create(ID.unique(), email, password, `${firstname} ${lastname}`);
		const session = await account.createEmailPasswordSession(email, password);

		// creating a session
		(await cookies()).set('Appwrite-session', session.secret, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: true,
		});
		return parseStringify(newUser);
	} catch (error) {
		console.error(error);
	}
};

// user login
export const loginUser = async ({ email, password }: signInProps) => {
	try {
		const { account } = await createAdminClient();
		const userLogin = await account.createEmailPasswordSession(email, password);
		return parseStringify(userLogin);
	} catch (error) {
		console.error(error);
	}
};

// check user session
export async function getLoggedInUser() {
	try {
		const { account } = await createSessionClient();
		const loggedUser = await account.get();
		return parseStringify(loggedUser);
	} catch (error) {
		return null;
	}
}
