'use server';

import { createAdminClient, createSessionClient } from '@/lib/server/Appwrite';
import { extractCustomerIdFromUrl, parseStringify } from '@/lib/utils'; //parsing a json data
import { cookies } from 'next/headers';
import { ID } from 'node-appwrite';
import { createDwollaCustomer } from './Dwolla.action';

const { APPWRITE_DATABASE_ID: DATABASE_ID, APPWRITE_USER_COLLECTION_ID: DATABASE_USER_COLLECTION } =
	process.env;

// new User
export const registerNewUser = async ({ password, ...userData }: SignUpParams) => {
	const { email, firstName, lastName } = userData;

	let newUser;
	try {
		const { account, database } = await createAdminClient();

		newUser = await account.create(ID.unique(), email, password, `${firstName} ${lastName}`);
		const session = await account.createEmailPasswordSession(email, password);

		if (!newUser) {
			throw new Error('error creating a new User');
		}

		const dwollaCustomerUrl = await createDwollaCustomer({
			...userData,
			type: 'personal',
		});

		if (!dwollaCustomerUrl) {
			throw new Error('error creating Dwolla Customer');
		}

		const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);

		const newCustomer = await database.createDocument(
			DATABASE_ID!,
			DATABASE_USER_COLLECTION!,
			ID.unique(),
			{
				...userData,
				userId: newUser.$id,
				dwollaCustomerId,
				dwollaCustomerUrl,
			}
		);

		// creating a session
		(await cookies())?.set('Appwrite-session', session?.secret, {
			path: '/',
			httpOnly: true,
			secure: true,
			maxAge: 60 * 60,
		});

		return parseStringify(newCustomer);
	} catch (error:any) {
		console.error(error.message);
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

// logout
export async function userLogout() {
	try {
		const { account } = await createAdminClient();
		(await cookies()).delete('Appwrite-session');
		await account.deleteSession('current');
	} catch (error) {
		return null;
	}
}
