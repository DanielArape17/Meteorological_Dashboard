// App.js
import { Hero } from "./components/Hero";
import { CardSection } from "./components/CardSection";
import { Navbar } from "./components/Navbar";
import { useWeatherData } from "./hooks/useWeatherData";
import { useCitySearch } from "./hooks/useCitySearch"; // ← Nuevo hook

function App() {
  const { searchedCity, handleCitySearch } = useCitySearch();
  const weatherData = useWeatherData(searchedCity);
  return (
    <div className="bg-[#131313] min-h-dvh p-4 flex flex-col gap-5">
      <Navbar onCitySearch={handleCitySearch}/>
      <Hero weather={weatherData.weather} isLoading={weatherData.isLoading} error={weatherData.error} />
      <CardSection weather={weatherData.weather} isLoading={weatherData.isLoading} error={weatherData.error}/>
    </div>
  )
}

export default App;
