import { Hero } from "./components/Hero";
import { useGeolocation } from "./hooks/useGeolocation";

import { useFetch } from "./hooks/useFetch";

function App() {

  const geolocation = useGeolocation()
  let position = geolocation.position

  const link = !geolocation.isLoading
    ? `https://api.openweathermap.org/data/2.5/weather?lat=${position[0]}&lon=${position[1]}&appid=ac709c6280eabf659733dcd5928c0456`
    : null;

  // Solo llama useFetch si hay link
  const weather = useFetch(link);

  console.log(geolocation)
  console.log(weather);
  
  return (
    <div className="bg-[#131313] h-screen p-4 flex flex-col gap-5">
      <nav className="flex justify-between">
        <p className="font-bold text-2xl text-white">Weather</p>
        <p className="font-semibold text-lg text-white">{position[0]} and {position[1]}</p>
      </nav>
      <h2 className="font-semibold text-2xl text-white">{weather?.data?.name}</h2>

      <Hero></Hero>
    </div>
  )
}

export default App
