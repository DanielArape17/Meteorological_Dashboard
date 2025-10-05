/**
 * Card component for displaying weather information with icon and chart
 * @param {Object} props - Component properties
 * @param {string} props.label - Label text for the card (e.g., "Temperature", "Humidity")
 * @param {React.ReactNode} props.icon - Icon element to display
 * @param {React.ReactNode} props.chart - Chart or visual representation component
 * @param {CardTheme} props.theme - Theme object containing styling classes
 * @returns {JSX.Element} - Rendered card component
 */
function Card({ label, icon, chart, theme }) {
  return (
    <div className={`${theme.background} ${theme.border} border rounded-lg p-4 backdrop-blur-sm`}>
      <div className="flex items-center justify-between mb-4">
        <span className={`${theme.accent} font-semibold text-sm`}>{label}</span>
        <span className={`${theme.accent} text-lg`}>{icon}</span>
      </div>
      <div className="flex justify-center">
        {chart}
      </div>
    </div>
  )
}

export { Card }