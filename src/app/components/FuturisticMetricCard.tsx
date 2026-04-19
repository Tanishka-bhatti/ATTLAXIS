import { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

interface FuturisticMetricCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  status: "excellent" | "good" | "warning" | "danger";
  unit?: string;
}

export function FuturisticMetricCard({ title, value, icon: Icon, status, unit = "" }: FuturisticMetricCardProps) {
  const statusColors = {
    excellent: {
      gradient: "from-cyan-500 to-blue-500",
      border: "border-cyan-500/40",
      glow: "shadow-cyan-500/20",
      text: "text-cyan-400",
    },
    good: {
      gradient: "from-blue-500 to-purple-500",
      border: "border-blue-500/40",
      glow: "shadow-blue-500/20",
      text: "text-blue-400",
    },
    warning: {
      gradient: "from-yellow-500 to-orange-500",
      border: "border-yellow-500/40",
      glow: "shadow-yellow-500/20",
      text: "text-yellow-400",
    },
    danger: {
      gradient: "from-red-500 to-pink-500",
      border: "border-red-500/40",
      glow: "shadow-red-500/20",
      text: "text-red-400",
    },
  };

  const colors = statusColors[status];

  return (
    <motion.div
      className={`bg-white/5 backdrop-blur-xl rounded-2xl p-6 border ${colors.border} ${colors.glow} shadow-2xl relative overflow-hidden group hover:scale-[1.02] transition-transform`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {/* Animated background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-5 group-hover:opacity-10 transition-opacity`} />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-400 text-sm font-medium tracking-wide uppercase">{title}</h3>
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colors.gradient} flex items-center justify-center shadow-lg`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
        </div>

        <div className="flex items-end justify-between mb-3">
          <div className={`text-4xl font-bold ${colors.text}`}>
            {value.toFixed(1)}
            {unit && <span className="text-lg text-gray-500 ml-1">{unit}</span>}
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-black/30 rounded-full overflow-hidden">
          <motion.div
            className={`h-full bg-gradient-to-r ${colors.gradient} rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>

        {/* Micro stat */}
        <div className="mt-3 text-xs text-gray-500">
          <span className={colors.text}>●</span> Live tracking
        </div>
      </div>
    </motion.div>
  );
}
