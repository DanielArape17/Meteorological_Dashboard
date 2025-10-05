/**
 * useSearchLocation hook - Provides city search functionality with OpenWeatherMap Geocoding API
 * Handles autocomplete suggestions, location URL generation, and search state management
 * Manages API requests for city data with loading states and error handling
 * 
 * @returns {Object} Search location state and methods
 * @returns {Object} returns.input - React ref for search input element
 * @returns {Function} returns.handleKeyDown - Keyboard event handler for Enter key submission
 * @returns {Function} returns.searchLocation - Generates weather API URLs from city data or input
 * @returns {Array} returns.suggestions - List of city suggestions from geocoding API
 * @returns {Function} returns.setSuggestions - Setter function for suggestions list
 * @returns {Function} returns.getCitySuggestions - Fetches city suggestions based on search text
 * @returns {boolean} returns.isLoading - Loading state for API requests
 */


import { useRef, useState } from 'react';

export function useSearchLocation() {
  const input = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Fetches city suggestions from OpenWeatherMap Geocoding API
   * Implements debounce-like behavior by requiring minimum 2 characters
   * Handles API errors and loading states appropriately
   * 
   * @param {string} searchText - Text input for city search (minimum 2 characters)
   */
  const getCitySuggestions = async (searchText) => {
    if (searchText.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${searchText}&limit=5&appid=ac709c6280eabf659733dcd5928c0456`
      );
      
      if (!response.ok) {
        throw new Error('Error en la API');
      }
      
      const data = await response.json();
      console.log("Respuesta de la API:", data);
      setSuggestions(data);
    } catch (error) {
      console.error('Error fetching city suggestions:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Generates OpenWeatherMap API URL for weather data based on city information
   * Supports both coordinate-based search (from suggestions) and name-based search
   * 
   * @param {Object|null} cityData - City data object with lat/lon coordinates or null for input-based search
   * @returns {string|null} Formatted API URL for weather data or null if insufficient data
   */
  const searchLocation = (cityData = null) => {
    if (cityData && cityData.lat && cityData.lon) {
      return `https://api.openweathermap.org/data/2.5/weather?lat=${cityData.lat}&lon=${cityData.lon}&appid=ac709c6280eabf659733dcd5928c0456&units=metric`;
    }
    
    if (input.current && input.current.value) {
      return `https://api.openweathermap.org/data/2.5/weather?q=${input.current.value}&appid=ac709c6280eabf659733dcd5928c0456&units=metric`;
    }
    
    return null;
  };

  /**
   * Handles keyboard events for search input, specifically Enter key submission
   * Triggers search callback with generated URL when Enter is pressed
   * 
   * @param {KeyboardEvent} event - Keyboard event object
   * @param {Function} onSearch - Callback function to execute with search results
   */
  const handleKeyDown = (event, onSearch) => {
    if (event.key === 'Enter' && input.current.value) {
      const url = searchLocation();
      if (url && onSearch) {
        onSearch(url, input.current.value);
      }
      setSuggestions([]);
    }
  };

  return {
    input,
    handleKeyDown,
    searchLocation,
    suggestions,
    setSuggestions,
    getCitySuggestions,
    isLoading
  };
}