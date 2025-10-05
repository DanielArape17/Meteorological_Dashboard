/**
 * useGeolocation hook - Provides browser geolocation capabilities with state management
 * Handles location fetching, error states, and loading status for user's current position
 * Uses the Navigator Geolocation API with optimized accuracy settings
 * 
 * @returns {Object} Geolocation state object
 * @returns {Array<number>|null} returns.position - Array containing [latitude, longitude] as fixed decimals, null if not available
 * @returns {string|Error|null} returns.error - Error message if geolocation failed, null if successful
 * @returns {boolean} returns.isLoading - Loading state indicating if geolocation request is in progress
 */


import { useState, useEffect } from "react";

function useGeolocation() {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocalización no soportada en este navegador");
      setIsLoading(false);
      return;
    }

    /**
     * Request current position with optimized settings for weather applications
     * @param {Position} position - Success callback with position data
     * @param {PositionError} err - Error callback with failure details
     */
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        setPosition([lat.toFixed(2), lon.toFixed(2)])
        setIsLoading(false);
      },
      (err) => {
        setError(err)
        console.error("Error al obtener la ubicación:", err.message);
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000, 
        maximumAge: 0 
      }
    )
  }, []);
  
  return { position, error, isLoading };
}

export { useGeolocation }