interface ReadinessGaugeProps {
  value: number;
}

export function ReadinessGauge({ value }: ReadinessGaugeProps) {
  const getColor = () => {
    if (value >= 80) return "#10b981";
    if (value >= 60) return "#3b82f6";
    if (value >= 40) return "#eab308";
    return "#ef4444";
  };

  const getStatus = () => {
    if (value >= 80) return "Excellent";
    if (value >= 60) return "Good";
    if (value >= 40) return "Fair";
    return "Poor";
  };

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="bg-white rounded-lg p-8 shadow-lg">
      <h2 className="text-xl text-gray-600 mb-6 text-center">Overall Readiness</h2>
      <div className="relative flex items-center justify-center">
        <svg width="200" height="200" className="transform -rotate-90">
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="12"
            fill="none"
          />
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke={getColor()}
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-5xl font-bold" style={{ color: getColor() }}>
            {value.toFixed(0)}
          </div>
          <div className="text-gray-500 mt-1">{getStatus()}</div>
        </div>
      </div>
    </div>
  );
}
