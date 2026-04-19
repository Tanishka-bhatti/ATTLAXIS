import { motion } from "motion/react";

interface BiomechanicalData {
  symmetry_ratio: number;
  socket_pressure: number;
  ground_contact_time: number;
  stride_length: number;
  heart_rate: number;
  intact_load: number;
  prosthetic_load: number;
}

interface BiomechanicalGridProps {
  data: BiomechanicalData;
}

export function BiomechanicalGrid({ data }: BiomechanicalGridProps) {
  const metrics = [
    {
      label: "Symmetry Ratio",
      value: data.symmetry_ratio.toFixed(2),
      unit: "",
      warning: data.symmetry_ratio > 1.3,
      color: data.symmetry_ratio > 1.3 ? "red" : "cyan",
    },
    {
      label: "Socket Pressure",
      value: data.socket_pressure.toFixed(1),
      unit: "kPa",
      warning: data.socket_pressure > 45,
      color: data.socket_pressure > 45 ? "yellow" : "blue",
    },
    {
      label: "Ground Contact",
      value: data.ground_contact_time.toFixed(0),
      unit: "ms",
      warning: false,
      color: "purple",
    },
    {
      label: "Stride Length",
      value: data.stride_length.toFixed(2),
      unit: "m",
      warning: false,
      color: "cyan",
    },
    {
      label: "Heart Rate",
      value: data.heart_rate.toFixed(0),
      unit: "bpm",
      warning: data.heart_rate > 170,
      color: data.heart_rate > 170 ? "red" : "blue",
    },
    {
      label: "Intact Load",
      value: data.intact_load.toFixed(1),
      unit: "N",
      warning: false,
      color: "purple",
    },
    {
      label: "Prosthetic Load",
      value: data.prosthetic_load.toFixed(1),
      unit: "N",
      warning: false,
      color: "cyan",
    },
  ];

  const colorMap = {
    red: { gradient: "from-red-500 to-pink-500", border: "border-red-500/40", text: "text-red-400" },
    yellow: { gradient: "from-yellow-500 to-orange-500", border: "border-yellow-500/40", text: "text-yellow-400" },
    cyan: { gradient: "from-cyan-500 to-blue-500", border: "border-cyan-500/40", text: "text-cyan-400" },
    blue: { gradient: "from-blue-500 to-purple-500", border: "border-blue-500/40", text: "text-blue-400" },
    purple: { gradient: "from-purple-500 to-pink-500", border: "border-purple-500/40", text: "text-purple-400" },
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20 shadow-2xl">
      <h3 className="text-lg font-bold text-white mb-6 tracking-wide">BIOMECHANICAL SENSORS</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {metrics.map((metric, idx) => {
          const colors = colorMap[metric.color as keyof typeof colorMap];
          return (
            <motion.div
              key={metric.label}
              className={`bg-black/30 backdrop-blur-sm rounded-xl p-4 border ${colors.border} hover:scale-105 transition-transform relative overflow-hidden`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              {metric.warning && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              )}
              <div className="text-xs text-gray-400 mb-2 uppercase tracking-wide">{metric.label}</div>
              <div className={`text-2xl font-bold ${colors.text}`}>
                {metric.value}
                <span className="text-sm font-normal text-gray-500 ml-1">{metric.unit}</span>
              </div>
              <div className={`h-1 bg-gradient-to-r ${colors.gradient} rounded-full mt-3 opacity-50`} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
