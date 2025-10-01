import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement);

const TemperatureBar = ({ minTemp, maxTemp, currentTemp }) => {
  if (!minTemp || !maxTemp || !currentTemp) 
    return <p className="text-[#acb0b9] font-semibold">Cargando...</p>;

  const currentPos = ((currentTemp - minTemp) / (maxTemp - minTemp)) * 100;

  // Crear gradiente con CSS
  const gradientStyle = {
    background: `linear-gradient(90deg, 
      rgba(100, 149, 237, 0.6) 0%, 
      rgba(100, 149, 237, 0.6) ${currentPos}%, 
      rgba(220, 20, 60, 0.6) ${currentPos}%, 
      rgba(220, 20, 60, 0.6) 100%)`,
    borderRadius: '10px',
    height: '100%',
    width: '100%'
  };

  return (
      <div className="h-4 w-full relative">
        {/* Barra de temperatura personalizada */}
        <div style={gradientStyle} />
        
        <div 
          className="absolute top-0 h-full w-1 bg-white border border-black border-opacity-30 z-10"
          style={{ 
            left: `${currentPos}%`,
            transform: 'translateX(-50%)'
          }}
        />
      </div>
    
  );
};

export { TemperatureBar }