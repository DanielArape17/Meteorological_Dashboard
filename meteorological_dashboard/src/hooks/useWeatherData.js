/**
 * useWeatherData hook - Centralized weather data management with geolocation fallback
 * Fetches weather information from OpenWeatherMap API based on searched city or user location
 * Handles loading states, errors, and data caching with priority for manual searches
 * 
 * @param {string|null} searchedCity - City name to search for, null triggers geolocation fallback
 * @returns {Object} Weather data state and status information
 * @returns {Object|null} returns.weather - Complete weather data object from API
 * @returns {string|null} returns.weatherError - Error message from weather API request
 * @returns {boolean} returns.weatherLoading - Loading state specific to weather data fetch
 * @returns {boolean} returns.isLoading - Combined loading state (geolocation OR weather data)
 * @returns {string|null} returns.error - Combined error state (geolocation OR weather data)
 */

import { useState, useEffect } from "react";
import { useGeolocation } from "./useGeolocation";

function useWeatherData(searchedCity) {
  const geolocation = useGeolocation();
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState(null);

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
    let url;

    if (searchedCity) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${API_KEY}&units=metric`;
    } else if (!geolocation.isLoading && geolocation.position) {
      const [lat, lon] = geolocation.position;
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    } else {
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
  }, [geolocation.isLoading, geolocation.position, searchedCity]); 

  return {
    weather,
    weatherError,
    weatherLoading,
    isLoading: geolocation.isLoading || weatherLoading,
    error: geolocation.error || weatherError
  };
}

export { useWeatherData };