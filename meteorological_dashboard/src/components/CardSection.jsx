/**
 * CardSection component - Container for weather metric cards displaying humidity, wind, and visibility. However, it could display more metrics.
 * Orchestrates the layout and data flow for weather visualization cards
 * 
 * @param {Object} props - Component properties
 * @param {WeatherData|null} props.weather - Weather data object from API
 * @param {boolean} props.isLoading - Loading state indicator
 * @param {string|null} props.error - Error message if data fetching failed
 * @returns {JSX.Element} - Rendered card section with weather metrics
 */

import { CircularProgress } from "./weatherCards/CircularProgress"
import { WindCompass } from './weatherCards/WindCompass'
import { Card } from "./weatherCards/Card"
import { getWeatherTheme } from '../utils/weatherThemes'
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

function CardSection ({ weather, isLoading, error }) {
  // Early return states for loading, error, and no data
  if (isLoading) return <p className="text-[#acb0b9] font-semibold">Cargando...</p>
  if (error) return <p className="text-[#acb0b9] font-semibold">Error: {error}</p>
  if (!weather) return <p className="text-[#acb0b9] font-semibold">No hay datos del clima</p>

  /**
   * Get visual theme based on current weather condition
   * Uses the first weather condition icon to determine theme
   * @type {WeatherTheme}
   */
  const theme = getWeatherTheme(weather.weather[0].icon)

  return(
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card 
        label={'HUMIDITY'} 
        icon={<WiHumidity color={theme.icon} size={28} />} 
        theme={theme}
        chart={
          <CircularProgress 
            value={Math.round(weather.main.humidity)} 
            unit={'%'} 
            color={theme.chartColor || 'rgba(82, 225, 211, 0.8)'}
          />
        }
      /> 
      
      <Card 
        label={'WIND'} 
        icon={<FaWind color={theme.icon} size={20}/>} 
        theme={theme}
        chart={
          <WindCompass 
            speed={weather.wind.speed} 
            direction={weather.wind.deg} 
            unit={'m/seg'}
            theme={theme}
          />
        }
      /> 
      
      <Card 
        label={'VISIBILITY'} 
        icon={<FaRegEye color={theme.icon} size={22}/>} 
        theme={theme}
        chart={
          <CircularProgress 
            value={Math.round(weather.visibility/1000)} 
            unit={'Km'} 
            color={theme.chartColor || 'rgba(183, 152, 231, 0.8)'} 
            max={10}
          />
        }
      /> 
    </section> 
  )
}

export { CardSection }

