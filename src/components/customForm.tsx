'use client';

import { FormControl, FormField, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Control, FieldPath } from 'react-hook-form';
import { LoginForm } from '@/lib/utils';
import z from 'zod';

const authForm = LoginForm('register');

interface customProps {
	label: string;
	placeholder: string;
	name: FieldPath<z.infer<typeof authForm>>;
	control: Control<z.infer<typeof authForm>>;
}

const customForm = ({ label, placeholder, name, control }: customProps) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<div className="form-item">
					<FormLabel className="form-label">{label}</FormLabel>
					<div className="flex flex-col w-full">
						<FormControl>
							<Input
								placeholder={placeholder}
								type={name === 'password' ? 'password' : 'text'}
								className="input-class"
								{...field}
							/>
						</FormControl>
						<FormMessage className="mt-2 form-message " />
					</div>
				</div>
			)}
		/>
	);
};

export default customForm;
