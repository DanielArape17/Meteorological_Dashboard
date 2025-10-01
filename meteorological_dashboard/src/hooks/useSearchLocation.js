import { useRef } from 'react';

export function useSearchLocation() {
  const input = useRef(null);

  const searchLocation = () => {
    if (input.current.value) {
      return `https://api.openweathermap.org/geo/1.0/direct?q=${input.current.value.toLowerCase()}&appid=ac709c6280eabf659733dcd5928c0456`;
    }
    return null;
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const url = searchLocation();
      console.log('URL generada:', url); 
    }
  };

  return {
    input,
    handleKeyDown,
    searchLocation 
  };
}