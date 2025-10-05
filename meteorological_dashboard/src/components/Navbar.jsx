/**
 * Navbar component - Main navigation bar with app title, search functionality, and external links
 * Serves as the primary navigation interface for the weather application
 * 
 * @param {Object} props - Component properties
 * @param {Function} props.onCitySearch - Callback function triggered when a city search is performed
 * @returns {JSX.Element} - Rendered navigation bar with search and external links
*/

import { SearchBar } from "./SearchBar";
import { FaGithub } from "react-icons/fa";

function Navbar({ onCitySearch }) {
  return (
    <nav className="flex justify-between items-center relative">
      {/* Título */}
      <p className="font-bold text-2xl text-white pr-6">Weather</p>
      
      {/* Componente SearchBar independiente */}
      <SearchBar onCitySearch={onCitySearch} />

    <a href="https://github.com/DanielArape17" target="_blank" className="pl-6">
      <FaGithub color="white" size={32}/>
    </a>
    </nav>
  );
}

export { Navbar };