import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const CircularProgress = ({ value, unit, color, max = 100 }) => {
  const data = {
    datasets: [{
      data: [value, max - value], 
      backgroundColor: [
        color,    
        'rgba(82, 225, 211, 0.1)',  
      ],
      borderWidth: 0,          
      borderColor: 'transparent',
      hoverBorderWidth: 0,     
    }]
  };

  const options = {
    cutout: '85%',              
    circumference: 360,  
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }
    },
    animation: {
      animateRotate: true,  
      animateScale: true     
    }
  };

  return (
    <div className="relative w-32 h-32">
      <Doughnut data={data} options={options} />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-4xl font-bold text-white">{value}{unit}</span>
      </div>
    </div>
  );
}

export { CircularProgress }