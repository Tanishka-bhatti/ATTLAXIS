import { motion } from "motion/react";

interface FuturisticReadinessGaugeProps {
  value: number;
}

export function FuturisticReadinessGauge({ value }: FuturisticReadinessGaugeProps) {
  const getColor = () => {
    if (value >= 80) return { primary: "#06b6d4", secondary: "#0891b2" }; // cyan
    if (value >= 60) return { primary: "#3b82f6", secondary: "#2563eb" }; // blue
    if (value >= 40) return { primary: "#a855f7", secondary: "#9333ea" }; // purple
    return { primary: "#ef4444", secondary: "#dc2626" }; // red
  };

  const getStatus = () => {
    if (value >= 80) return "OPTIMAL";
    if (value >= 60) return "READY";
    if (value >= 40) return "MODERATE";
    return "CAUTION";
  };

  const colors = getColor();
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-cyan-500/20 shadow-2xl relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-blue-500/5 animate-pulse" />

      <div className="relative z-10">
        <h2 className="text-xl font-bold text-white mb-6 text-center tracking-wide">
          READINESS SCORE
        </h2>

        <div className="relative flex items-center justify-center mb-4">
          <svg width="220" height="220" className="transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="110"
              cy="110"
              r={radius}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="16"
              fill="none"
            />

            {/* Glow effect */}
            <circle
              cx="110"
              cy="110"
              r={radius}
              stroke={colors.primary}
              strokeWidth="16"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="blur-sm opacity-50"
            />

            {/* Main progress circle */}
            <motion.circle
              cx="110"
              cy="110"
              r={radius}
              stroke={`url(#gradient-${value})`}
              strokeWidth="16"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1, ease: "easeOut" }}
            />

            <defs>
              <linearGradient id={`gradient-${value}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={colors.primary} />
                <stop offset="100%" stopColor={colors.secondary} />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {value.toFixed(0)}
            </motion.div>
            <div className="text-gray-400 text-sm mt-2 tracking-widest">{getStatus()}</div>
          </div>
        </div>

        {/* Status bars */}
        <div className="grid grid-cols-3 gap-2 mt-6">
          <div className="text-center">
            <div className="text-xs text-gray-400 mb-1">MIN</div>
            <div className="text-sm font-bold text-red-400">40</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-400 mb-1">TARGET</div>
            <div className="text-sm font-bold text-cyan-400">80</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-400 mb-1">PEAK</div>
            <div className="text-sm font-bold text-purple-400">100</div>
          </div>
        </div>
      </div>
    </div>
  );
}
