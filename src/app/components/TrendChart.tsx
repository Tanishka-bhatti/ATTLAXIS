import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface TrendChartProps {
  data: Array<{
    time: number;
    stability: number;
    fatigue: number;
    injury: number;
    readiness: number;
  }>;
}

export function TrendChart({ data }: TrendChartProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h2 className="text-xl text-gray-600 mb-4">Performance Trends</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="time"
            tickFormatter={(val) => `${val}s`}
            stroke="#6b7280"
          />
          <YAxis stroke="#6b7280" domain={[0, 100]} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="stability"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            name="Stability"
          />
          <Line
            type="monotone"
            dataKey="fatigue"
            stroke="#eab308"
            strokeWidth={2}
            dot={false}
            name="Fatigue"
          />
          <Line
            type="monotone"
            dataKey="injury"
            stroke="#ef4444"
            strokeWidth={2}
            dot={false}
            name="Injury Risk"
          />
          <Line
            type="monotone"
            dataKey="readiness"
            stroke="#10b981"
            strokeWidth={3}
            dot={false}
            name="Readiness"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
