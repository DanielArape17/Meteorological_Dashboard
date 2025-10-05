/**
 * Hero component - Main weather display section showing current conditions, temperature, and location
 * Serves as the primary visual interface for current weather information
 * 
 * @param {Object} props - Component properties
 * @param {WeatherData|null} props.weather - Complete weather data object from API
 * @param {boolean} props.isLoading - Loading state indicator
 * @param {string|null} props.error - Error message if data fetching failed
 * @returns {JSX.Element} - Rendered hero section with weather overview
 */

import { TemperatureBar } from "./TemperatureBar";
import { getWeatherTheme } from "../utils/weatherThemes"
import { FaLocationDot } from "react-icons/fa6";

function Hero({ weather, isLoading, error }) {
  // Early return states for loading, error, and no data scenarios
  if (isLoading) return <p className="text-[#acb0b9] font-semibold">Cargando...</p>;
  if (error) return <p className="text-[#acb0b9] font-semibold">Error: {error}</p>;
  if (!weather) return <p className="text-[#acb0b9] font-semibold">No hay datos del clima</p>;

  /**
   * Get visual theme based on current weather condition icon
   * Determines colors and styles for the entire hero section
   * @type {WeatherTheme}
   */
  const theme = getWeatherTheme(weather.weather[0].icon);
  

  return(
    <main className={`border ${theme?.border} ${theme?.background} p-8 rounded-md transition-all duration-500`}>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <FaLocationDot color={theme.icon} size={20}/>
            <p className={`${theme.accent} font-semibold text-2xl`}>{weather.name}</p>
          </div>
          <div>
            <p className={`${theme.accent} text-lg font-semibold`}>{weather.weather[0].main}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-2 md:flex-row">
            <h2 className={`${theme.text} text-8xl font-bold`}>{Math.round(weather.main.temp)}°</h2>
            <div className="flex flex-col gap-2 justify-end">
              <h3 className={`${theme.text} text-2xl font-semibold capitalize`}>
                {weather.weather[0].description}
              </h3>
              <div className="flex gap-2">
                <p className={`${theme.accent} text-xl`}>H: {Math.round(weather.main.temp_max)}°</p>
                <p className={`${theme.accent} text-xl`}>L: {Math.round(weather.main.temp_min)}°</p>
              </div>
            </div>
          </div>
          
          <img 
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} 
            alt={weather.weather[0].description}
          />
        </div>
        
        {weather ? (
          <div className="w-full lg:w-md">
            <TemperatureBar 
              minTemp={Math.round(weather.main.temp_min)} 
              maxTemp={Math.round(weather.main.temp_max)} 
              currentTemp={Math.round(weather.main.temp)} 
              theme={theme} // Pasamos todo el tema que incluye chartColor
            />
          </div>
        ) : (
          <div className="w-[30%] flex items-center justify-center h-20">
            <p className={theme.accent}>Cargando gráfico de temperatura...</p>
          </div>
        )}
      </div>
    </main>
  );
}

export { Hero };