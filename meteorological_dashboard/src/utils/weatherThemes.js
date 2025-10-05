/**
 * getWeatherTheme function - Maps OpenWeatherMap icon codes to visual themes for weather display
 * Provides consistent color schemes, gradients, and styling based on weather conditions and time of day
 * Each theme includes Tailwind CSS classes for backgrounds, text, borders, and chart colors
 * 
 * @param {string} iconCode - OpenWeatherMap icon code (e.g., '01d', '10n', '13d')
 * @returns {Object} Weather theme object with visual properties
 * @returns {string} returns.background - Tailwind gradient classes for main background
 * @returns {string} returns.border - Tailwind color class for border styling
 * @returns {string} returns.text - Tailwind color class for primary text
 * @returns {string} returns.accent - Tailwind classes for accent text with font weight
 * @returns {string} returns.icon - Tailwind color class for icon styling
 * @returns {string} returns.card - Tailwind classes for card background with backdrop blur
 * @returns {string} [returns.chartColor] - CSS color value for chart elements (optional)
 */

function getWeatherTheme(iconCode) {
	/**
   * Theme definitions mapping OpenWeatherMap icon codes to visual designs
   * Icons follow pattern: {condition}{time} where:
   * - First digit: main condition (01=clear, 02=few clouds, etc.)
   * - Second character: d=day, n=night
   * @type {Object}
   */

  const themes = {
    '01d': {
			background: 'bg-gradient-to-br from-blue-400 to-yellow-200',
			border: 'border-yellow-300',
			text: 'text-gray-900',
			accent: 'text-gray-800 font-semibold',
			icon: 'text-yellow-500',
			card: 'bg-white/80 backdrop-blur-sm',
			chartColor: '#f59e0b' 
    },

    '01n': {
			background: 'bg-gradient-to-br from-blue-900 to-purple-800',
			border: 'border-purple-400',
			text: 'text-white',
			accent: 'text-purple-200 font-semibold',
			icon: 'text-yellow-300',
			card: 'bg-gray-900/80 backdrop-blur-sm',
			chartColor: '#eab308' 
    },
    
    '02d': {
			background: 'bg-gradient-to-br from-blue-300 to-gray-200',
			border: 'border-blue-400',
			text: 'text-gray-800',
			accent: 'text-blue-700 font-semibold',
			icon: 'text-blue-600',
			card: 'bg-white/80 backdrop-blur-sm',
			chartColor: '#3b82f6' 
    },

    '02n': {
			background: 'bg-gradient-to-br from-blue-900 to-gray-800',
			border: 'border-blue-600',
			text: 'text-gray-100',
			accent: 'text-blue-200 font-semibold',
			icon: 'text-blue-400',
			card: 'bg-gray-900/80 backdrop-blur-sm',
			chartColor: '#60a5fa' 
    },
    
    '03d': {
			background: 'bg-gradient-to-br from-gray-400 to-gray-300',
			border: 'border-gray-500',
			text: 'text-gray-900',
			accent: 'text-gray-700 font-semibold',
			icon: 'text-gray-600',
			card: 'bg-white/80 backdrop-blur-sm',
			chartColor: 'white' 
    },

    '03n': {
			background: 'bg-gradient-to-br from-gray-700 to-gray-900',
			border: 'border-gray-600',
			text: 'text-gray-200',
			accent: 'text-gray-300 font-semibold',
			icon: 'text-gray-400',
			card: 'bg-gray-800/80 backdrop-blur-sm',
			chartColor: 'white' 
    },
    
    '04d': {
			background: 'bg-gradient-to-br from-gray-500 to-gray-400',
			border: 'border-gray-600',
			text: 'text-white',
			accent: 'text-gray-200 font-semibold',
			icon: 'text-gray-300',
			card: 'bg-gray-700/80 backdrop-blur-sm',
			chartColor: 'white' 
		},

		'04n': {
			background: 'bg-gradient-to-br from-gray-800 to-gray-950',
			border: 'border-gray-700',
			text: 'text-white',
			accent: 'text-gray-200 font-semibold',
			icon: 'text-gray-300',
			card: 'bg-gray-900/90 backdrop-blur-sm',
			chartColor: 'white' 
    },
    
    '09d': {
			background: 'bg-gradient-to-br from-blue-600 to-gray-500',
			border: 'border-blue-500',
			text: 'text-white',
			accent: 'text-blue-200 font-semibold',
			icon: 'text-blue-300',
			card: 'bg-blue-800/80 backdrop-blur-sm',
			chartColor: '#1d4ed8' 
    },

    '09n': {
			background: 'bg-gradient-to-br from-blue-900 to-gray-800',
			border: 'border-blue-700',
			text: 'text-white',
			accent: 'text-blue-100 font-semibold',
			icon: 'text-blue-300',
			card: 'bg-blue-900/80 backdrop-blur-sm',
			chartColor: '#1e40af' 
    },
    
    '10d': {
			background: 'bg-gradient-to-br from-blue-500 to-gray-400',
			border: 'border-blue-400',
			text: 'text-white',
			accent: 'text-blue-100 font-semibold',
			icon: 'text-blue-200',
			card: 'bg-blue-700/80 backdrop-blur-sm',
			chartColor: '#2563eb' 
    },

    '10n': {
			background: 'bg-gradient-to-br from-blue-800 to-gray-700',
			border: 'border-blue-600',
			text: 'text-white',
			accent: 'text-blue-50 font-semibold',
			icon: 'text-blue-200',
			card: 'bg-blue-800/80 backdrop-blur-sm',
			chartColor: '#1d4ed8'
    },
    
    '11d': {
			background: 'bg-gradient-to-br from-purple-800 to-gray-700',
			border: 'border-purple-500',
			text: 'text-white',
			accent: 'text-purple-200 font-semibold',
			icon: 'text-yellow-400',
			card: 'bg-purple-900/80 backdrop-blur-sm',
    },

    '11n': {
			background: 'bg-gradient-to-br from-purple-900 to-gray-800',
			border: 'border-purple-600',
			text: 'text-white',
			accent: 'text-purple-100 font-semibold',
			icon: 'text-yellow-300',
			card: 'bg-purple-950/80 backdrop-blur-sm',
			chartColor: '#9333ea'
    },

    '13d': {
			background: 'bg-gradient-to-br from-blue-200 to-gray-100',
			border: 'border-blue-300',
			text: 'text-gray-800',
			accent: 'text-blue-600 font-semibold',
			icon: 'text-blue-500',
			card: 'bg-white/90 backdrop-blur-sm',
			chartColor: '#0ea5e9' 
    },

    '13n': {
			background: 'bg-gradient-to-br from-blue-800 to-gray-900',
			border: 'border-blue-400',
			text: 'text-gray-100',
			accent: 'text-blue-100 font-semibold',
			icon: 'text-blue-300',
			card: 'bg-gray-800/90 backdrop-blur-sm',
			chartColor: '#38bdf8' 
    },

    '50d': {
			background: 'bg-gradient-to-br from-gray-300 to-gray-400',
			border: 'border-gray-500',
			text: 'text-gray-900',
			accent: 'text-gray-700 font-semibold',
			icon: 'text-gray-600',
			card: 'bg-white/80 backdrop-blur-sm',
			chartColor: '#4b5563' 
    },

    '50n': {
			background: 'bg-gradient-to-br from-gray-600 to-gray-800',
			border: 'border-gray-500',
			text: 'text-gray-200',
			accent: 'text-gray-300 font-semibold',
			icon: 'text-gray-400',
			card: 'bg-gray-700/80 backdrop-blur-sm',
			chartColor: '#6b7280' 
    }
};

const defaultTheme = {
	background: 'bg-gradient-to-br from-slate-500/30 via-gray-600/25 to-slate-700/20',
	text: 'text-slate-50',
	accent: 'text-slate-300',
	border: 'border-slate-600/30'
};

return themes[iconCode] || defaultTheme;
}

export { getWeatherTheme };