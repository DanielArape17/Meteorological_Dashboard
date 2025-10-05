/**
 * useSearchBar hook - Manages search bar state and interactions for city search functionality
 * Orchestrates suggestion display, input handling, and city selection with integrated geolocation
 * Provides complete search UX management including keyboard navigation and blur handling
 * 
 * @param {Function} onCitySearch - Callback function triggered when a city is selected
 * @returns {Object} Search bar state and handler methods
 * @returns {Array} returns.suggestions - List of city suggestion objects
 * @returns {boolean} returns.isLoading - Loading state for search operations
 * @returns {boolean} returns.showSuggestions - Visibility state for suggestions dropdown
 * @returns {Object} returns.input - Reference to input element
 * @returns {Function} returns.handleInputChange - Handler for input change events
 * @returns {Function} returns.handleSuggestionClick - Handler for suggestion selection
 * @returns {Function} returns.handleKeyPress - Handler for keyboard navigation
 * @returns {Function} returns.handleInputBlur - Handler for input blur with delayed close
 * @returns {Function} returns.setShowSuggestions - Setter for suggestions visibility
 * @returns {Function} returns.setSuggestions - Setter for suggestions list
 */

import { useSearchLocation } from "./useSearchLocation";
import { useState } from 'react';

export function useSearchBar(onCitySearch) {
  const { 
    input, 
    handleKeyDown, 
    suggestions, 
    setSuggestions, 
    getCitySuggestions,
    isLoading,
    searchLocation 
  } = useSearchLocation();

  /**
   * Controls visibility state of suggestions dropdown
   * @type {[boolean, Function]}
   */
  const [showSuggestions, setShowSuggestions] = useState(false);

  /**
   * Handles input change events and triggers suggestion fetching
   * Manages suggestions visibility based on input content
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event
   */
  const handleInputChange = (e) => {
    const value = e.target.value;
    
    if (value) {
      getCitySuggestions(value);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  };

  /**
   * Handles city selection from suggestions dropdown
   * Formats selected city data and triggers parent callback
   * Updates input value and cleans up suggestions UI
   * 
   * @param {Object} suggestion - Selected suggestion object with name and country
   */
  const handleSuggestionClick = (suggestion) => {
    console.log("Usuario hizo clic en:", suggestion);
    
    const url = searchLocation(suggestion);
    
    if (url && onCitySearch) {
      onCitySearch(url, `${suggestion.name}, ${suggestion.country}`);
    }
    
    if (input.current) {
      input.current.value = `${suggestion.name}, ${suggestion.country}`;
    }
    
    setShowSuggestions(false);
    setSuggestions([]);
  };

  const handleKeyPress = (event) => {
    handleKeyDown(event, onCitySearch);
  };

  const handleInputBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200);
  };

  return {
    suggestions,
    isLoading,
    showSuggestions,
    input,
    handleInputChange,
    handleSuggestionClick,
    handleKeyPress,
    handleInputBlur,
    setShowSuggestions,
    setSuggestions
  };
}