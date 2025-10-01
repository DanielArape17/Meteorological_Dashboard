import { CircularProgress } from "./weatherCards/CircularProgress"
import { WindCompass } from './weatherCards/WindCompass'
import { Card } from "./weatherCards/Card"
import { useWeatherData } from '../hooks/useWeatherData' 

function CardSection () {
  const { weather, isLoading, error } = useWeatherData()

  if (isLoading) return <p className="text-[#acb0b9] font-semibold">Cargando...</p>
  if (error) return <p className="text-[#acb0b9] font-semibold">Error: {error}</p>
  if (!weather) return <p className="text-[#acb0b9] font-semibold">No hay datos del clima</p>

  return(
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card label={'HUMIDITY'} icon={'G'} chart={<CircularProgress value={Math.round(weather.main.humidity)} unit={'%'} color={'rgba(82, 225, 211, 0.8)'}/>}/> 
      <Card label={'WIND'} icon={'W'} chart={<WindCompass speed={weather.wind.speed} direction={weather.wind.deg} unit={'m/seg'}/>}/> 
      <Card label={'VISIBILITY'} icon={'V'} chart={<CircularProgress value={weather.visibility/1000} unit={'Km'} color={'rgba(183, 152, 231, 0.8)'} max={10}/>}/> 
    </section> 
  )
}

export { CardSection }