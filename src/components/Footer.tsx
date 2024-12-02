import { userLogout } from '@/server-actions/Appwrite.action';
import Image from 'next/image';
import { redirect } from 'next/navigation';

const Footer = ({ user, type = 'desktop' }: FooterProps) => {
	const handleLogout = async () => {
		const loggedOut = await userLogout();
		redirect('/login');
	};

	return (
		<section className="footer">
			{user ? (
				<>
					<div className={type === 'mobile' ? 'footer_name-mobile' : 'footer_name'}>
						<div className="font-bold text-gray-600">{user?.name[0].toUpperCase()}</div>
					</div>

					<div className={type === 'mobile' ? 'footer_email-mobile' : 'footer_email'}>
						<h3 className="text-14 font-semibold truncate text-gray-700">{user?.name}</h3>

						<p className="text-14 font-normal truncate text-gray-500">{user?.email}</p>
					</div>

					<div className="footer_image" onClick={handleLogout}>
						<Image src={'/icons/logout.svg'} alt="logout-icon" width={20} height={20} />
					</div>
				</>
			) : null}
		</section>
	);
};

export default Footer;
