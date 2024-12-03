import { useCallback, useEffect, useState } from 'react';
import { Button } from './ui/button';
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link';
import { createLinkToken } from '@/server-actions/Plaid.action';

const plaidLink = ({ user, variant }: PlaidLinkProps) => {
	const [token, setToken] = useState('');

	// fetching user token
	useEffect(() => {
		const fetchTokenLink = async () => {
			const data = await createLinkToken(user);
			setToken(data?.linktoken);
		};

		fetchTokenLink();
	}, [user]);

	// success
	const onSuccess = useCallback<PlaidLinkOnSuccess>((publicToken: string) => {



		
	}, [user]);

	// plaid config
	const config: PlaidLinkOptions = {
		onSuccess,
		token,
	};

	const { open, ready } = usePlaidLink(config);

	return (
		<>
			{variant === 'primary' ? (
				<Button onClick={() => open()} className="plaidlink-primary">
					Connect Bank
				</Button>
			) : variant === 'ghost' ? (
				<Button>Connect Bank</Button>
			) : (
				<Button>Connect Bank</Button>
			)}
		</>
	);
};

export default plaidLink;
