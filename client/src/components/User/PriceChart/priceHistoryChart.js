import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);
Chart.defaults.plugins.tooltip.mode = 'index';
Chart.defaults.plugins.tooltip.intersect = false;

Chart.defaults.font.family = "'Inter', sans-serif";

Chart.defaults.borderColor = '#E5E7EB';

Chart.defaults.color = 'black';

const PriceHistoryChart = ({ priceHistory, comp, lineColour }) => {
  const data = {
    labels: priceHistory.map(item => new Date(Number(item.date)).toLocaleDateString()),
    datasets: [
      {
        label: `${comp} Price History`,
        data: priceHistory.map(item => item.price),
        fill: false,
        borderColor: lineColour,
        pointBackgroundColor: lineColour,
        tension: 0.1,
      },
    ],
  };
  const options = {
    scales: {
      x: {
        type: 'category',
      },
      y: {
        min: 0,
        max: 50,
      },
    },
    plugins: {
        legend: {
            labels: {
                color: lineColour
            }
        }
    }
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Line data={data} options={options} width={400} height={400} />
    </div>
  );
};

export default PriceHistoryChart;