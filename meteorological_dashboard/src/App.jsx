// App.js
import { useState } from 'react';
import { Hero } from "./components/Hero";
import { CardSection } from "./components/CardSection";
import { Navbar } from "./components/Navbar";
import { useWeatherData } from "./hooks/useWeatherData";

function App() {
  const [searchedCity, setSearchedCity] = useState(null);
  
  // Pasa el estado de la ciudad buscada al hook y al Navbar
  const weatherData = useWeatherData(searchedCity);

  return (
    <div className="bg-[#131313] min-h-dvh p-4 flex flex-col gap-5">
      <Navbar onCitySearch={setSearchedCity} />
      <Hero weather={weatherData.weather} isLoading={weatherData.isLoading} error={weatherData.error} />
      <CardSection />
    </div>
  )
}

export default App
