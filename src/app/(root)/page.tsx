import HeaderBox from '@/components/HeaderBox';
import Transactionbox from '@/components/transactionbox';
import { getLoggedInUser } from '@/server-actions/index.action';

const Home = async () => {
	const isLogged = await getLoggedInUser();
	return (
		<section className="home">
			<div className="home-content">
				<header className="home-header">
					{/* user Details */}
					<HeaderBox
						title="welcome"
						user={isLogged?.name || 'guest'}
						type="greeting"
						subtext="admin"
					/>

					{/* balance details */}
					<Transactionbox accounts={[]} totalCurrentBalance={4211.32} totalBanks={2} />
				</header>
			</div>
		</section>
	);
};

export default Home;
