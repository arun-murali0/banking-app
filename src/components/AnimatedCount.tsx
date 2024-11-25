"use client"

import Countup from 'react-countup';

const AnimatedCount = ({ amount }: { amount: number }) => {
	return (
		<section>
			$<Countup end={amount} duration={2} decimals={2}  />
		</section>
	);
};

export default AnimatedCount;
