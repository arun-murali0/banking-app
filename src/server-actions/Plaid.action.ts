import { plaidApiConfig } from '@/lib/Plaid';
import { encryptId, parseStringify } from '@/lib/utils';
import { revalidatePath } from 'next/cache';
import {
	CountryCode,
	ProcessorTokenCreateRequest,
	ProcessorTokenCreateRequestProcessorEnum,
	Products,
} from 'plaid';
import { addFundingSource } from './Dwolla.action';
import { createAdminClient } from '@/lib/server/Appwrite';
import { ID } from 'node-appwrite';

const {
	APPWRITE_DATABASE_ID: DATABASE_ID,
	APPWRITE_BANK_COLLECTION_ID: DATABASE_BANK_COLLECTION,
	APPWRITE_USER_COLLECTION_ID: DATABASE_USER_COLLECTION,
} = process.env;


// create new Bank Account
const createBankAccount = async ({
	accountId,
	accessToken,
	bankId,
	fundingSourceUrl,
	sharableId,
	userId,
}: createBankAccountProps) => {
	try {
		const { database } = await createAdminClient();

		const bankAccount = await database.createDocument(
			DATABASE_ID!,
			DATABASE_BANK_COLLECTION!,
			ID.unique(),
			{
				accountId,
				accessToken,
				bankId,
				fundingSourceUrl,
				sharableId,
				userId,
			}
		);
		return parseStringify(bankAccount);
	} catch (error) {
		console.error(error);
	}
};

// Create plaid Token
export const createLinkToken = async (user: User) => {
	try {
		const tokenParams = {
			user: {
				client_user_id: user.$id!,
			},
			client_name: user.name!,
			products: ['auth'] as Products[],
			language: 'en'!,
			country_code: ['US'] as CountryCode[],
		};

		const response = await plaidApiConfig.linkTokenCreate(tokenParams);

		return parseStringify({ linkToken: response.data.link_token });
	} catch (error) {
		console.error(error);
	}
};


export const exchangeToken = async ({ publicToken, user }: exchangePublicTokenProps) => {
	try {
		const res = await plaidApiConfig.itemPublicTokenExchange({
			public_token: publicToken,
		});

		const accessToken = res.data.access_token;
		const itemId = res.data.item_id;

		// get account information
		const accountResponse = await plaidApiConfig.accountsGet({
			access_token: accessToken,
		});

		// get bank data
		const accountData = accountResponse.data.accounts[0];

		// dwolla token
		const request: ProcessorTokenCreateRequest = {
			access_token: accessToken,
			account_id: accountData.account_id,
			processor: 'dwolla' as ProcessorTokenCreateRequestProcessorEnum,
		};

		const processTokenResponse = await plaidApiConfig.processorTokenCreate(request);
		const processorToken = processTokenResponse.data.processor_token;

		// Funding Source
		const fundingSourceUrl = await addFundingSource({
			dwollaCustomerId: user.$id,
			processorToken,
			bankName: accountData.name,
		});

		if (!fundingSourceUrl) throw Error;

		// create bank Account
		await createBankAccount({
			userId: user.$id,
			bankId: itemId,
			accountId: accountData.account_id,
			accessToken,
			fundingSourceUrl,
			sharableId: encryptId(accountData.account_id),
		});

		// check data
		revalidatePath('/');

		// return success
		return parseStringify({
			publicExchangeToken: 'complete',
		});
	} catch (error) {
		console.error(error);
	}
};
