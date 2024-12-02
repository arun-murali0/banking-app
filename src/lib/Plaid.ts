import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

const plaidConfiguration = new Configuration({
	basePath: PlaidEnvironments.sandbox,
	baseOptions: {
		headers: {
			'plaid-client_ID': process.env.PLAID_CLIENT_ID,
			'plaid-secret': process.env.PLAID_SECRET,
		},
	},
});

export const plaidApiConfig = new PlaidApi(plaidConfiguration);
