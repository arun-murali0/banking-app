'use client';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
	const data = {
		datasets: [
			{
				label: 'Banks',
				data: [1354, 6322, 6342],
				backgroundColor: ['#0747b6', '#2265d8', '#2f91fa'],
			},
		],
		label: ['Bank-1', 'Bank-2', 'Bank-3'],
	};

	return (
		<section className="w-36 h-36">
			<Doughnut
				data={data}
				options={{
					cutout: '70%',
					plugins: {
						legend: {
							display: false,
						},
					},
				}}
			/>
		</section>
	);
};

export default DoughnutChart;
