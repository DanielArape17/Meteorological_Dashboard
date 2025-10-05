/**
 * useCitySearch hook - Manages city search state and parsing logic for weather application
 * Provides centralized handling for different city search methods (coordinates vs name)
 * and extracts clean city names from various URL formats
 * 
 * @returns {Object} Hook return object
 * @returns {string|null} returns.searchedCity - Current searched city name
 * @returns {Function} returns.handleCitySearch - Function to process and set city search from URLs
 */

import { useState } from 'react';

export function useCitySearch() {
  const [searchedCity, setSearchedCity] = useState(null);

  /**
   * Processes city search URLs and extracts clean city names
   * Handles two search methods: coordinates (with display name) and traditional name search
   * 
   * @param {string} url - Search URL containing either coordinate parameters or city name
   * @param {string} [displayName=''] - Formatted display name for coordinate-based searches (e.g., "Valencia, España")
   */

  const handleCitySearch = (url, displayName = '') => {
    if (!url) return;

    let cityName = '';

    // Case 1: Coordinate-based search (from suggestions)
    if (url.includes('lat=') && url.includes('lon=')) {
      cityName = displayName.split(',')[0].trim(); 
    }
    // Case 2: Traditional name-based search
    else if (url.includes('q=')) {
      const match = url.match(/q=([^&]+)/);
      cityName = match ? decodeURIComponent(match[1]) : '';
    }
    
    console.log("Ciudad a buscar:", cityName);
    
    if (cityName) {
      setSearchedCity(cityName);
    }
  };

  return {
    searchedCity,
    handleCitySearch
  };
}