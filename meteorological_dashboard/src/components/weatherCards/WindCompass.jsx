/**
 * Wind compass component displaying wind direction and speed with SVG visualization
 * Features a circular compass with directional arrow and cardinal points
 * 
 * @param {Object} props - Component properties
 * @param {number} props.speed - Wind speed value
 * @param {number} props.direction - Wind direction in degrees (0-360°, where 0° is North)
 * @param {string} [props.unit='km/h'] - Unit for wind speed display
 * @returns {JSX.Element} - Rendered wind compass component
 */

function WindCompass ({speed, direction, unit = 'km/h'}) {
  /**
   * Convert wind direction from degrees to radians and adjust for SVG coordinate system
   * SVG: 0° is East, but meteorological: 0° is North
   * Subtraction of 90° converts from meteorological to SVG coordinates
   */
  const angleInRadians = (direction - 90) * (Math.PI / 180); // -90 para que 0° sea Norte
  const arrowLength = 30;
  
  const arrowEndX = 50 + arrowLength * Math.cos(angleInRadians);
  const arrowEndY = 50 + arrowLength * Math.sin(angleInRadians);

  const headStartLength = arrowLength - 8; // La cabeza comienza 8px antes del final
  const headStartX = 50 + headStartLength * Math.cos(angleInRadians);
  const headStartY = 50 + headStartLength * Math.sin(angleInRadians);

  /**
   * Convert wind direction in degrees to cardinal direction abbreviation
   * @param {number} deg - Wind direction in degrees (0-360)
   * @returns {string} - Cardinal direction (N, NNE, NE, ENE, E, ESE, SE, SSE, S, SSW, SW, WSW, W, WNW, NW, NNW)
   */
  const getWindDirection = (deg) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return directions[Math.round(deg / 22.5) % 16];
  };

  return (
    <div className="flex items-center gap-14">
      <div className="relative w-32 h-32">
        <svg width="100%" height="100%" viewBox="0 0 100 100">

          <circle cx="50" cy="50" r="49" fill="none" stroke="white" strokeWidth="2"/>
          
          {[45, 135, 225, 315].map((angle, index) => {
            const rad = (angle - 90) * (Math.PI / 180);
            const x1 = 50 + 40 * Math.cos(rad);
            const y1 = 50 + 40 * Math.sin(rad);
            const x2 = 50 + 45 * Math.cos(rad);
            const y2 = 50 + 45 * Math.sin(rad);
            
            return (
              <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="1"/>
            );
          })}

          <line 
            x1="50" 
            y1="50" 
            x2={headStartX} 
            y2={headStartY} 
            stroke="white" 
            strokeWidth="3"
            strokeLinecap="round"
          />

          <circle cx="50" cy="50" r="3" fill="white"/>
        
          <polygon 
            points={`
              ${arrowEndX},${arrowEndY} 
              ${headStartX - 4 * Math.cos(angleInRadians + Math.PI/2)},${headStartY - 4 * Math.sin(angleInRadians + Math.PI/2)}
              ${headStartX - 4 * Math.cos(angleInRadians - Math.PI/2)},${headStartY - 4 * Math.sin(angleInRadians - Math.PI/2)}
            `} 
            fill="white" 
          />
        </svg>
        
        <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-xs text-white">N</div>
        <div className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs text-white">E</div>
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs text-white">S</div>
        <div className="absolute left-1 top-1/2 transform -translate-y-1/2 text-xs text-white">O</div>
      </div>

      <div className="text-center">
        <div className="text-3xl font-bold text-white">{speed} {unit}</div>
        <div className="text-lg text-white">
          {getWindDirection(direction)} • {direction}°
        </div>
      </div>
      
    </div>
  );
};

export { WindCompass };