import { TemperatureBar } from "./TemperatureBar"

function Hero() {
  /*
  const temperatureData = {
    current: 18,
    max: 22,
    min: 14
  }

  console.log(temperatureData)
  */
  return(
    <section>
      <div className="flex justify-between">
        <div>
          <p className="text-[#acb0b9ff] font-semibold">LONDON, GB</p>
        </div>
        <div>
          <p className="text-[#acb0b9] font-semibold">UPDATED 12:34</p>
        </div>
      </div>
      <div className="flex items-end gap-4">
        <h2 className="text-[#FAFAFA] text-8xl font-bold">18°</h2>
        <div>
          <h3 className="text-[#FAFAFA] text-2xl font-semibold">PARTLY CLOUDY</h3>
          <div className="flex gap-2">
            <p className="text-[#acb0b9] text-lg">H: 22°</p>
            <p className="text-[#acb0b9] text-lg">L: 14°</p>
          </div>
        </div>
      </div>
      {/*<div className="text-white">
          <TemperatureBar 
          minTemp={14} 
          maxTemp={22} 
          currentTemp={18} 
        />
      </div>*/}
    </section>
  )
}

export { Hero }