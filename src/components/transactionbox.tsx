import AnimatedCount from './AnimatedCount';
import DoughnutChart from './DoughnutChart';

const transactionbox = ({
	accounts = [],
	totalBanks = 1,
	totalCurrentBalance = 1000,
}: TotlaBalanceBoxProps) => {
	return (
		<section className="total-balance">
			<div className="total-balance-chart">
				<DoughnutChart accounts={accounts} />
			</div>
			<div className="flex flex-col gap-6 mx-4">
				<h2 className="header-2">Bank Accounts:&nbsp;{totalBanks}</h2>
				<div className="flex flex-col gap-2">
					<div className="total-balance-label">Total Current Balance</div>
					<div className="total-balance-amount flex-center gap-2">
						<AnimatedCount amount={totalCurrentBalance} />
					</div>
				</div>
			</div>
		</section>
	);
};

export default transactionbox;
