import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  attackData: {
    attackName: string;
    count: number;
    status: boolean;
    subAttacks: { attackName: string; count: number; status: boolean }[];
  }[];
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ attackData }) => {
  // Calculate passed and pending counts
  const passedCounts = attackData.map((attack) =>
    attack.subAttacks.reduce((acc, sub) => acc + (sub.status ? sub.count : 0), 0)
  );

  const pendingCounts = attackData.map((attack) =>
    attack.subAttacks.reduce((acc, sub) => acc + (!sub.status ? sub.count : 0), 0)
  );

  const doughnutData = {
    labels: attackData.map((attack) => attack.attackName),
    datasets: [
      {
        label: 'Passed Tests',
        data: passedCounts,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Pending Tests',
        data: pendingCounts,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">Comparison of Passed and Pending Tests</h2>
      <Doughnut data={doughnutData} />
    </div>
  );
};

export default DoughnutChart;
