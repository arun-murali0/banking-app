'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Form } from './ui/form';
import CustomForm from './customForm';
import { LoginForm } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

interface formProp {
	user: string;
	isLoading: boolean;
	type: string;
}

const FormInput = ({ user, isLoading, type }: formProp) => {
	const authForm = LoginForm(type);

	const form = useForm<z.infer<typeof authForm>>({
		resolver: zodResolver(authForm),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	function onSubmit(values: z.infer<typeof authForm>) {
		isLoading(true);
		try {
		} catch (error) {
			console.log(error);
		} finally {
			isLoading(false);
		}
	}

	return (
		<section>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					{type === 'register' && (
						<>
							<div className="flex gap-5">
								<CustomForm
									control={form.control}
									label={'Firstname'}
									name="firstname"
									placeholder={'firstname'}
								/>
								<CustomForm
									control={form.control}
									label={'Lastname'}
									name="lastname"
									placeholder={'lastname'}
								/>
							</div>

							<CustomForm
								control={form.control}
								label={'Address'}
								name="address"
								placeholder={'Enter your Address'}
							/>
							<div className="flex gap-5">
								<CustomForm
									control={form.control}
									label={'State'}
									name="state"
									placeholder={'state'}
								/>
								<CustomForm
									control={form.control}
									label={'Postal Code'}
									name="postalcode"
									placeholder={'eg:600001'}
								/>
							</div>
							<div className="flex gap-5">
								<CustomForm
									control={form.control}
									label={'Date of Birth'}
									name="dob"
									placeholder={'DD-MM-YYYY'}
								/>
								<CustomForm
									control={form.control}
									label={'SSN'}
									name="ssn"
									placeholder={'eg:-1234'}
								/>
							</div>
						</>
					)}

					<CustomForm
						control={form.control}
						label={'Email'}
						name={'email'}
						placeholder={'Enter your Email'}
					/>
					<CustomForm
						control={form.control}
						label={'Password'}
						name={'password'}
						placeholder={'Enter your password'}
					/>

					<Button type="submit" className="form-btn w-full" disabled={isLoading}>
						{isLoading ? (
							<>
								<Loader2 className="animate-spin" /> submitting...
							</>
						) : type === 'login' ? (
							'sign In'
						) : (
							'sign Up'
						)}
					</Button>
				</form>
				<div className="flex justify-center mt-5 gap-1">
					<div className="font-normal text-14">
						{type === 'login' ? `Don't Have An Account ?` : `Already have account ?`}
						<Link className="form-link" href={type === 'login' ? '/register' : '/login'}>
							&nbsp;{type === 'login' ? 'Sign Up' : 'Sign In'}
						</Link>
					</div>
				</div>
			</Form>
		</section>
	);
};

export default FormInput;
