import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  status: "excellent" | "good" | "warning" | "danger";
}

export function MetricCard({ title, value, icon: Icon, status }: MetricCardProps) {
  const statusColors = {
    excellent: "bg-green-500",
    good: "bg-blue-500",
    warning: "bg-yellow-500",
    danger: "bg-red-500",
  };

  const statusBorders = {
    excellent: "border-green-500",
    good: "border-blue-500",
    warning: "border-yellow-500",
    danger: "border-red-500",
  };

  return (
    <div className={`bg-white rounded-lg p-6 border-2 ${statusBorders[status]} shadow-lg`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-600">{title}</h3>
        <Icon className={`w-6 h-6 ${statusColors[status].replace('bg-', 'text-')}`} />
      </div>
      <div className="flex items-end justify-between">
        <div className="text-4xl font-bold">{value.toFixed(1)}</div>
        <div className="w-full max-w-[120px] h-2 bg-gray-200 rounded-full ml-4">
          <div
            className={`h-full rounded-full ${statusColors[status]} transition-all duration-300`}
            style={{ width: `${value}%` }}
          />
        </div>
      </div>
    </div>
  );
}
