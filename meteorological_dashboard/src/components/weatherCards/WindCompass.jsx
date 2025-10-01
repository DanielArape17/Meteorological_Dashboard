// WindCompass.jsx
function WindCompass ({speed, direction, unit = 'km/h'}) {
  // Convertir dirección en grados a coordenadas para la flecha
  const angleInRadians = (direction - 90) * (Math.PI / 180); // -90 para que 0° sea Norte
  const arrowLength = 30;
  
  const arrowEndX = 50 + arrowLength * Math.cos(angleInRadians);
  const arrowEndY = 50 + arrowLength * Math.sin(angleInRadians);

  const headStartLength = arrowLength - 8; // La cabeza comienza 8px antes del final
  const headStartX = 50 + headStartLength * Math.cos(angleInRadians);
  const headStartY = 50 + headStartLength * Math.sin(angleInRadians);

  // Dirección cardinal basada en grados
  const getWindDirection = (deg) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return directions[Math.round(deg / 22.5) % 16];
  };

  return (
    <div className="flex items-center gap-14">
      {/* Brújula SVG */}
      <div className="relative w-32 h-32">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          {/* Círculo exterior */}
          <circle cx="50" cy="50" r="49" fill="none" stroke="#374151" strokeWidth="2"/>
          
          {/* Puntos intermedios */}
          {[45, 135, 225, 315].map((angle, index) => {
            const rad = (angle - 90) * (Math.PI / 180);
            const x1 = 50 + 40 * Math.cos(rad);
            const y1 = 50 + 40 * Math.sin(rad);
            const x2 = 50 + 45 * Math.cos(rad);
            const y2 = 50 + 45 * Math.sin(rad);
            
            return (
              <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#6B7280" strokeWidth="1"/>
            );
          })}
          
          {/* Flecha de dirección del viento */}
          <line 
            x1="50" 
            y1="50" 
            x2={headStartX} 
            y2={headStartY} 
            stroke="rgba(82, 225, 211, 0.8)" 
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Punto Central */}
          <circle cx="50" cy="50" r="3" fill="rgba(82, 225, 211, 0.8)"/>
          
          
          {/* Cabeza de la flecha */}
          <polygon 
            points={`
              ${arrowEndX},${arrowEndY} 
              ${headStartX - 4 * Math.cos(angleInRadians + Math.PI/2)},${headStartY - 4 * Math.sin(angleInRadians + Math.PI/2)}
              ${headStartX - 4 * Math.cos(angleInRadians - Math.PI/2)},${headStartY - 4 * Math.sin(angleInRadians - Math.PI/2)}
            `} 
            fill="rgba(82, 225, 211, 0.8)" 
          />
        </svg>
        
        {/* Letras cardinales */}
        <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-xs text-gray-400">N</div>
        <div className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">E</div>
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs text-gray-400">S</div>
        <div className="absolute left-1 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">O</div>
      </div>

      {/* Información de viento */}
      <div className="text-center">
        <div className="text-3xl font-bold text-white">{speed} {unit}</div>
        <div className="text-lg text-gray-400">
          {getWindDirection(direction)} • {direction}°
        </div>
      </div>
      
    </div>
  );
};

export { WindCompass };