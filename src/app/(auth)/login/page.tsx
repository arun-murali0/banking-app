import AuthForm from '@/components/AuthForm';

const login = () => {
	return (
		<div className='flex-center max-sm:px-5 size-full'>
			<AuthForm type={"login"} />
		</div>
	);
};

export default login;
