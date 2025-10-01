function Card({ label, icon, chart }) {
  return (
    <div className="bg-[#1c1c1c] flex flex-col p-4 rounded-lg">
      <h4 className="text-[#acb0b9] flex items-center gap-2 mb-4">
        <span>{icon}</span>
        <span>{label}</span>
      </h4>
      <div className="flex justify-center">
        {chart}
      </div>
    </div>
  );
}

export { Card }