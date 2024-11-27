import AuthForm from '@/components/AuthForm';

const register = () => {
	return (
		<div className='flex-center size-full max-sm:px-5'>
			<AuthForm type={"register"} />
		</div>
	);
};

export default register;
