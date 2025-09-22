import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement);

const TemperatureBar = ({ minTemp, maxTemp, currentTemp }) => {
  const chartData = {
    labels: [''],
    datasets: [
      {
        data: [minTemp],
        backgroundColor: '#6495edcc',
      },
      {
        data: [currentTemp - minTemp],
        backgroundColor: '#ffa500cc',
      },
      {
        data: [maxTemp - currentTemp],
        backgroundColor: '#dc143ccc',
      }
    ]
  };

  const chartOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false // Oculta la leyenda
      },
      tooltip: {
        enabled: false // Desactiva los tooltips
      }
    },
    scales: {
      x: {
        stacked: true,
        display: false,
      },
      y: {
        stacked: true,
        display: false,
      }
    }
  };

  return (
    <div className="h-8 w-full border">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export { TemperatureBar }