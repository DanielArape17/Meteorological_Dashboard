/**
 * SearchBar component - Input field with autocomplete suggestions for city search
 * Provides real-time city suggestions and handles user selection with keyboard and mouse interactions
 * 
 * @param {Object} props - Component properties
 * @param {Function} props.onCitySearch - Callback function triggered when a city is selected or searched
 * @returns {JSX.Element} - Rendered search bar with autocomplete dropdown
 */

import { useSearchBar } from "../hooks/useSearchBar";

function SearchBar({ onCitySearch }) {
  const {
    input,
    suggestions,
    isLoading,
    showSuggestions,
    handleInputChange,
    handleSuggestionClick,
    handleKeyPress,
    handleInputBlur,
    setShowSuggestions
  } = useSearchBar(onCitySearch);

  return (
    <div className="flex-1 max-w-md relative">
      {/* INPUT DE BÚSQUEDA */}
      <input
        ref={input}
        onKeyDown={handleKeyPress}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onFocus={() => {
          if (suggestions.length > 0) setShowSuggestions(true);
        }}
        type="text"
        placeholder="Buscar ciudad..."
        className="flex py-1 px-3 text-white bg-[#2e313880] border border-[#3a3e45] rounded-md w-full placeholder:text-[#acb0b9]"
      />
      
      {/* DROPDOWN DE SUGERENCIAS */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 bg-[#2e3138] border border-[#3a3e45] rounded-md mt-1 z-10 max-h-60 overflow-y-auto">
          {isLoading ? (
            <div className="px-3 py-2 text-white text-center">Buscando ciudades...</div>
          ) : suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <div
                key={index}
                onMouseDown={() => handleSuggestionClick(suggestion)}
                className="px-3 py-2 text-white cursor-pointer hover:bg-[#3a3e45] border-b border-[#3a3e45] last:border-b-0"
              >
                <div className="font-medium">{suggestion.name}</div>
                <div className="text-sm text-gray-400">
                  {suggestion.state && `${suggestion.state}, `}{suggestion.country}
                </div>
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-gray-400 text-center">No se encontraron ciudades</div>
          )}
        </div>
      )}
    </div>
  );
}

export { SearchBar };