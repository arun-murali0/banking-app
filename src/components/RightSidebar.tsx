import Link from 'next/link';
import Image from 'next/image';
import BankCard from './BankCard';

const RightSidebar = async ({ transactions, banks, user }: RightSidebarProps) => {
	return (
		<aside className="right-sidebar">
			{/* user detail */}
			<section className="flex flex-col pb-8">
				<div className="profile-banner">
					<div className="profile">
						<div className="profile-img">
							<span className="text-5xl font-bold text-bankGradient">{user?.name[0]}</span>
						</div>
					</div>
				</div>
				<div className="profile-details mx-6">
					<div className="profile-name">{user?.name}</div>
				</div>
			</section>

			{/* End */}

			{/* bank section */}

			<section className="banks">
				<div className="flex w-full justify-between">
					<div className="header-2">MyBanks</div>
					<Link href="/" className="flex gap-1">
						<Image src={'/icons/plus.svg'} height={20} width={20} alt="plus" />
						<div className="text-14 font-semibold text-gray-600">Add Banks</div>
					</Link>
				</div>

				{banks?.length > 0 && (
					<div className="relative flex flex-1 flex-col justify-center items-center gap-2">
						<div className="relative z-10">
							<BankCard />
						</div>
						{banks[1] && (
							<div className="absolute top-8 right-0 z-0 w-[90%] ">
								<BankCard />
							</div>
						)}
					</div>
				)}
			</section>

			{/* End */}
		</aside>
	);
};

export default RightSidebar;
