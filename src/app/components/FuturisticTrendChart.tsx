import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface FuturisticTrendChartProps {
  data: Array<{
    time: number;
    stability: number;
    fatigue: number;
    injury: number;
    readiness: number;
  }>;
}

export function FuturisticTrendChart({ data }: FuturisticTrendChartProps) {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-white tracking-wide">PERFORMANCE ANALYTICS</h2>
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-400" />
            <span className="text-gray-400">Stability</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="text-gray-400">Fatigue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <span className="text-gray-400">Injury Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-400" />
            <span className="text-gray-400">Readiness</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorStability" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorFatigue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#facc15" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#facc15" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorInjury" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorReadiness" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis
            dataKey="time"
            tickFormatter={(val) => `${val}s`}
            stroke="#6b7280"
            style={{ fontSize: "12px" }}
          />
          <YAxis stroke="#6b7280" domain={[0, 100]} style={{ fontSize: "12px" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(0,0,0,0.9)",
              border: "1px solid rgba(6,182,212,0.3)",
              borderRadius: "12px",
              backdropFilter: "blur(10px)",
            }}
            labelStyle={{ color: "#fff" }}
          />
          <Area
            type="monotone"
            dataKey="stability"
            stroke="#06b6d4"
            strokeWidth={2}
            fill="url(#colorStability)"
            dot={false}
          />
          <Area
            type="monotone"
            dataKey="fatigue"
            stroke="#facc15"
            strokeWidth={2}
            fill="url(#colorFatigue)"
            dot={false}
          />
          <Area
            type="monotone"
            dataKey="injury"
            stroke="#ef4444"
            strokeWidth={2}
            fill="url(#colorInjury)"
            dot={false}
          />
          <Area
            type="monotone"
            dataKey="readiness"
            stroke="#a855f7"
            strokeWidth={3}
            fill="url(#colorReadiness)"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
