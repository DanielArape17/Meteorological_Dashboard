import { useGeolocation } from "../hooks/useGeolocation";
import { useRef } from 'react';

function Navbar({ onCitySearch }) {
  const geolocation = useGeolocation();
  const input = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && input.current.value) {
      // 🔥 Llama a la función pasada desde App con el valor de la ciudad
      onCitySearch(input.current.value);
      input.current.value = ''; // Opcional: limpiar el input
    }
  };

  return (
    <nav className="flex justify-between items-center ">
      <p className="font-bold text-2xl text-white">Weather</p>
      <div className="flex-1 max-w-md">
        <input
          ref={input}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Search location..."
          className="flex py-1 px-3 text-white bg-[#2e313880] border border-[#3a3e45] rounded-md w-full placeholder:text-[#acb0b9]"
        />
      </div>
      <p className="font-semibold text-lg text-white">
        {geolocation.isLoading ? "Cargando..." :
        geolocation.error ? "Error en ubicación" :
        `${geolocation.position[0]} and ${geolocation.position[1]}`}
      </p>
    </nav>
  )
}

export { Navbar }