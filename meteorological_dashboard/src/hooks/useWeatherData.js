import { useState, useEffect } from "react";
import { useGeolocation } from "./useGeolocation";

function useWeatherData(searchedCity) {
  const geolocation = useGeolocation();
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState(null);

  useEffect(() => {
    const API_KEY = 'ac709c6280eabf659733dcd5928c0456';
    let url;

    if (searchedCity) {
      // ✅ URL CORRECTA para obtener el clima por nombre de ciudad
      url = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${API_KEY}&units=metric&lang=es`;
    } else if (!geolocation.isLoading && geolocation.position) {
      // Usar geolocalización
      const [lat, lon] = geolocation.position;
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`;
    } else {
      // No hay ciudad buscada ni ubicación lista
      return;
    }

    const fetchWeather = async () => {
      setWeatherLoading(true);
      setWeatherError(null);
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error HTTP! estado: ${response.status}`);
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setWeatherError(err.message);
      } finally {
        setWeatherLoading(false);
      }
    };

    fetchWeather();
  }, [geolocation.isLoading, geolocation.position, searchedCity]); // ✅ searchedCity ahora es una dependencia

  return {
    weather,
    weatherError,
    weatherLoading,
    isLoading: geolocation.isLoading || weatherLoading,
    error: geolocation.error || weatherError
  };
}

export { useWeatherData };