import { AlertTriangle, Info, CheckCircle, XCircle } from "lucide-react";

interface Alert {
  type: "critical" | "warning" | "info" | "success";
  message: string;
  timestamp: string;
}

interface AlertsPanelProps {
  stability: number;
  fatigue: number;
  injury: number;
  symmetryRatio: number;
  socketPressure: number;
}

export function AlertsPanel({ stability, fatigue, injury, symmetryRatio, socketPressure }: AlertsPanelProps) {
  const alerts: Alert[] = [];
  const now = new Date().toLocaleTimeString();

  if (injury > 60) {
    alerts.push({
      type: "critical",
      message: "High injury risk detected - immediate attention required",
      timestamp: now,
    });
  }

  if (symmetryRatio > 1.3) {
    alerts.push({
      type: "warning",
      message: `High asymmetry detected (${symmetryRatio.toFixed(2)}) - check prosthetic alignment`,
      timestamp: now,
    });
  }

  if (socketPressure > 45) {
    alerts.push({
      type: "warning",
      message: `Elevated socket pressure (${socketPressure.toFixed(1)} kPa) - monitor for discomfort`,
      timestamp: now,
    });
  }

  if (fatigue > 75) {
    alerts.push({
      type: "warning",
      message: "Fatigue increasing - consider active recovery",
      timestamp: now,
    });
  }

  if (stability < 40) {
    alerts.push({
      type: "critical",
      message: "Gait instability detected - review biomechanics",
      timestamp: now,
    });
  }

  if (alerts.length === 0) {
    alerts.push({
      type: "success",
      message: "All systems nominal - performance tracking active",
      timestamp: now,
    });
  }

  const alertStyles = {
    critical: {
      bg: "bg-red-500/10",
      border: "border-red-500/40",
      icon: XCircle,
      iconColor: "text-red-400",
      glow: "shadow-red-500/20",
    },
    warning: {
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/40",
      icon: AlertTriangle,
      iconColor: "text-yellow-400",
      glow: "shadow-yellow-500/20",
    },
    info: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/40",
      icon: Info,
      iconColor: "text-blue-400",
      glow: "shadow-blue-500/20",
    },
    success: {
      bg: "bg-green-500/10",
      border: "border-green-500/40",
      icon: CheckCircle,
      iconColor: "text-green-400",
      glow: "shadow-green-500/20",
    },
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 shadow-2xl">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-purple-400" />
        System Alerts
      </h3>
      <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar">
        {alerts.map((alert, idx) => {
          const style = alertStyles[alert.type];
          const Icon = style.icon;
          return (
            <div
              key={idx}
              className={`${style.bg} ${style.border} ${style.glow} rounded-xl p-4 border shadow-lg transition-all hover:scale-[1.02]`}
            >
              <div className="flex items-start gap-3">
                <Icon className={`w-5 h-5 ${style.iconColor} flex-shrink-0 mt-0.5`} />
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">{alert.message}</p>
                  <p className="text-gray-400 text-xs mt-1">{alert.timestamp}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
