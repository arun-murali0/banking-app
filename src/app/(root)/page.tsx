import HeaderBox from '@/components/HeaderBox';
import Transactionbox from '@/components/transactionbox';

const Home = () => {
	const isLogged = { firstname: 'Arun' };

	return (
		<section className="home">
			<div className="home-content">
				<header className="home-header">
					{/* user Details */}
					<HeaderBox
						title="welcome"
						user={isLogged.firstname || 'guest'}
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
