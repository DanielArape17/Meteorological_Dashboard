/**
 * TemperatureBar component - Visual temperature range indicator showing current temperature between min and max
 * Displays a gradient bar from cool to warm colors with a marker for current temperature
 * 
 * @param {Object} props - Component properties
 * @param {number} props.minTemp - Minimum temperature value in the range
 * @param {number} props.maxTemp - Maximum temperature value in the range
 * @param {number} props.currentTemp - Current temperature value to position the marker
 * @param {Object} props.theme - Theme object containing color and styling properties
 * @param {string} props.theme.accent - CSS class for text accent color
 * @returns {JSX.Element} - Rendered temperature bar with range indicator
 */

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement);


function TemperatureBar({ minTemp, maxTemp, currentTemp, theme }) {
  /**
   * Calculate the position percentage of current temperature within the min-max range
   * Ensures the percentage stays within 0-100% bounds
   * 
   * @type {number}
   */

  const tempRange = maxTemp - minTemp;
  const currentPosition = ((currentTemp - minTemp) / tempRange) * 100;
  
  return (
    <div>

      <div className="relative h-6 bg-gray-300/50 rounded-full overflow-hidden">

        <div 
          className="absolute inset-0 rounded-full transition-all duration-1000 ease-out"
          style={{
            background: `linear-gradient(90deg, #3b82f6, #ef4444)`
          }}
        />
        
        <div
          className="absolute top-0 h-6 w-2 bg-white rounded-full shadow-lg transform -translate-x-1/2 transition-all duration-1000 ease-out"
          style={{
            left: `${currentPosition}%`,
            boxShadow: '0 0 8px rgba(255,255,255,0.8)'
          }}
        >
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-2">
        <span className={`${theme?.accent} font-semibold text-sm`}>{minTemp}°</span>
        <span className={`${theme?.accent} font-semibold text-sm`}>{maxTemp}°</span>
      </div>
    </div>
  );
}

export { TemperatureBar };