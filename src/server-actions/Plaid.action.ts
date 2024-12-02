import { plaidApiConfig } from '@/lib/Plaid';
import { encryptId, parseStringify } from '@/lib/utils';
import {
	CountryCode,
	ProcessorTokenCreateRequest,
	ProcessorTokenCreateRequestProcessorEnum,
	Products,
} from 'plaid';

export const createLinkToken = async (user: User) => {
	try {
		const tokenParams = {
			user: {
				client_user_id: user.$id,
			},
			client_name: user.name,
			products: ['auth'] as Products[],
			language: 'en',
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
		const fundingSourceURL = await addFundingSource({
			dwollaCustomerId: user.$id,
			processorToken,
			bankName: accountData.name,
		});

		if (!fundingSourceURL) throw Error;

		// create bank Account
		await createBankAccount({
			userId: user.$id,
			bankId: itemId,
			accountId: accountData.account_id,
			accessToken,
			fundingSourceURL,
			sharableId: encryptId(accountData.account_id),
		});
	} catch (error) {
		console.error(error);
	}
};
