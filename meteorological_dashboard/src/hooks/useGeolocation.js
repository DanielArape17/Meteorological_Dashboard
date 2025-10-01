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