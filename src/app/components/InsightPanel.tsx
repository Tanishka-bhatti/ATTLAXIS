import { AlertCircle, CheckCircle, TrendingUp, Activity } from "lucide-react";

interface InsightPanelProps {
  stability: number;
  fatigue: number;
  injury: number;
  readiness: number;
}

export function InsightPanel({ stability, fatigue, injury, readiness }: InsightPanelProps) {
  const insights = [];

  if (readiness >= 80) {
    insights.push({
      type: "success",
      icon: CheckCircle,
      message: "Excellent condition for high-intensity training",
    });
  } else if (readiness < 50) {
    insights.push({
      type: "warning",
      icon: AlertCircle,
      message: "Consider active recovery or reduced training load",
    });
  }

  if (fatigue > 70) {
    insights.push({
      type: "warning",
      icon: AlertCircle,
      message: "Elevated fatigue detected - monitor closely",
    });
  }

  if (injury > 60) {
    insights.push({
      type: "danger",
      icon: AlertCircle,
      message: "High injury risk - check prosthetic alignment and socket fit",
    });
  }

  if (stability < 40) {
    insights.push({
      type: "danger",
      icon: Activity,
      message: "Gait instability detected - review biomechanics",
    });
  }

  if (insights.length === 0) {
    insights.push({
      type: "info",
      icon: TrendingUp,
      message: "Monitoring performance - stay consistent with training plan",
    });
  }

  const typeStyles = {
    success: "bg-green-50 border-green-200 text-green-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    danger: "bg-red-50 border-red-200 text-red-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">AI Insights & Recommendations</h3>
      <div className="space-y-3">
        {insights.map((insight, idx) => {
          const Icon = insight.icon;
          return (
            <div
              key={idx}
              className={`p-4 rounded-lg border ${typeStyles[insight.type as keyof typeof typeStyles]}`}
            >
              <div className="flex items-start gap-3">
                <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <p className="text-sm font-medium">{insight.message}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
