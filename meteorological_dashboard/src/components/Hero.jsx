import { TemperatureBar } from "./TemperatureBar"

function Hero({ weather, isLoading, error }) {

  if (isLoading) return <p className="text-[#acb0b9] font-semibold">Cargando...</p>
  if (error) return <p className="text-[#acb0b9] font-semibold">Error: {error}</p>
  if (!weather) return <p className="text-[#acb0b9] font-semibold">No hay datos del clima</p>
  
  return(
    <main className="border border-[#3a3e45] bg-linear-65 from-gray-500/25 to-gray-700/20 p-8 rounded-md">
      <div className="flex flex-col gap-4 ">
        <div className="flex justify-between">
          <div>
            <p className="text-[#acb0b9ff] font-semibold">{weather.name}</p>
          </div>
          <div>
            <p className="text-[#acb0b9] font-semibold">UPDATED 12:34</p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex">
            <h2 className="text-[#FAFAFA] text-8xl font-bold">{Math.round(weather.main.temp)}°</h2>
            <div className="flex flex-col justify-end">
              <h3 className="text-[#FAFAFA] text-2xl font-semibold capitalize">{weather.weather[0].description}</h3>
              <div className="flex gap-2 ">
                <p className="text-[#acb0b9] text-lg">H: {Math.round(weather.main.temp_max)}°</p>
                <p className="text-[#acb0b9] text-lg">L: {Math.round(weather.main.temp_min)}°</p>
              </div>
            </div>
          </div>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="" />

        </div>
        {weather ? (
            <div className="w-[30%]">
              <TemperatureBar 
                minTemp={Math.round(weather.main.temp_min)} 
                maxTemp={Math.round(weather.main.temp_max)} 
                currentTemp={Math.round(weather.main.temp)} 
              />
            </div>
          ) : (
            <div className="w-[30%] flex items-center justify-center h-20">
              <p className="text-[#acb0b9]">Cargando gráfico de temperatura...</p>
            </div>
          )}
      </div>
    </main>
  )
}

export { Hero }