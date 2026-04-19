import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface LoadDistributionChartProps {
  intactLoad: number;
  prostheticLoad: number;
  symmetryRatio: number;
}

export function LoadDistributionChart({ intactLoad, prostheticLoad, symmetryRatio }: LoadDistributionChartProps) {
  const data = [
    { limb: "Intact", load: intactLoad },
    { limb: "Prosthetic", load: prostheticLoad },
  ];

  const isBalanced = symmetryRatio >= 0.9 && symmetryRatio <= 1.15;

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Load Distribution</h3>
        <div className="text-right">
          <div className="text-xs text-gray-500">Symmetry Ratio</div>
          <div className={`text-2xl font-bold ${isBalanced ? "text-green-600" : "text-yellow-600"}`}>
            {symmetryRatio.toFixed(2)}
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="limb" stroke="#6b7280" />
          <YAxis stroke="#6b7280" label={{ value: "Load (N)", angle: -90, position: "insideLeft" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
            }}
          />
          <Bar dataKey="load" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index === 0 ? "#3b82f6" : "#8b5cf6"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
