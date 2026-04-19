import { useState, useEffect } from "react";
import { Activity, Heart, AlertTriangle, TrendingUp, Play, Pause, Zap, Users, User } from "lucide-react";
import { FuturisticMetricCard } from "./components/FuturisticMetricCard";
import { FuturisticReadinessGauge } from "./components/FuturisticReadinessGauge";
import { FuturisticTrendChart } from "./components/FuturisticTrendChart";
import { BiomechanicalGrid } from "./components/BiomechanicalGrid";
import { AlertsPanel } from "./components/AlertsPanel";
import { AthleteProfile } from "./components/AthleteProfile";
import {
  StabilityModel,
  FatigueModel,
  InjuryModel,
  computeReadiness,
  generateBiomechanicalData,
  BiomechanicalFeatures,
} from "./models/mlModels";

interface Metrics {
  stability: number;
  fatigue: number;
  injury: number;
  readiness: number;
}

export default function App() {
  const [stabilityModel] = useState(new StabilityModel());
  const [fatigueModel] = useState(new FatigueModel());
  const [injuryModel] = useState(new InjuryModel());

  const [biomechData, setBiomechData] = useState<BiomechanicalFeatures>(generateBiomechanicalData());
  const [metrics, setMetrics] = useState<Metrics>({
    stability: 75,
    fatigue: 30,
    injury: 15,
    readiness: 70,
  });

  const [history, setHistory] = useState<Array<Metrics & { time: number }>>([]);
  const [isLive, setIsLive] = useState(false);
  const [time, setTime] = useState(0);
  const [mode, setMode] = useState<"athlete" | "coach">("athlete");

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setTime((prev) => prev + 1);

      // Generate new biomechanical data
      const newBiomechData = generateBiomechanicalData(biomechData);
      setBiomechData(newBiomechData);

      // Run ML models
      const stability = stabilityModel.predict(newBiomechData);
      const fatigue = fatigueModel.predict(newBiomechData);
      const injury = injuryModel.predict(newBiomechData, stability);
      const readiness = computeReadiness(stability, fatigue, injury);

      const newMetrics = {
        stability,
        fatigue,
        injury,
        readiness,
      };

      setMetrics(newMetrics);
      setHistory((prev) => {
        const updated = [...prev, { ...newMetrics, time }];
        return updated.slice(-40);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isLive, biomechData, stabilityModel, fatigueModel, injuryModel]);

  const getStatus = (value: number, inverted = false): "excellent" | "good" | "warning" | "danger" => {
    const effectiveValue = inverted ? 100 - value : value;
    if (effectiveValue >= 80) return "excellent";
    if (effectiveValue >= 60) return "good";
    if (effectiveValue >= 40) return "warning";
    return "danger";
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-blue-500/5" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-[1920px] mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 via-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-400 bg-clip-text text-transparent tracking-tight">
                  ATLAXIS
                </h1>
                <p className="text-cyan-300/60 text-sm tracking-wide">Where Motion Meets Machine Intelligence</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Mode Toggle */}
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-xl rounded-xl p-1 border border-purple-500/20">
                <button
                  onClick={() => setMode("athlete")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    mode === "athlete"
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <User className="w-4 h-4" />
                  Athlete
                </button>
                <button
                  onClick={() => setMode("coach")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    mode === "coach"
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Users className="w-4 h-4" />
                  Coach
                </button>
              </div>

              {/* Stream Control */}
              <button
                onClick={() => setIsLive(!isLive)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold shadow-2xl transition-all hover:scale-105 ${
                  isLive
                    ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-red-500/30"
                    : "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-cyan-500/30"
                }`}
              >
                {isLive ? (
                  <>
                    <Pause className="w-5 h-5" />
                    Stop
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Start
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Athlete Profile */}
        <div className="mb-6">
          <AthleteProfile mode={mode} />
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-6">
          {/* Readiness Gauge */}
          <div className="xl:col-span-4">
            <FuturisticReadinessGauge value={metrics.readiness} />
          </div>

          {/* Metric Cards */}
          <div className="xl:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FuturisticMetricCard
              title="Stability"
              value={metrics.stability}
              icon={Activity}
              status={getStatus(metrics.stability)}
            />
            <FuturisticMetricCard
              title="Fatigue"
              value={metrics.fatigue}
              icon={Heart}
              status={getStatus(metrics.fatigue, true)}
            />
            <FuturisticMetricCard
              title="Injury Risk"
              value={metrics.injury}
              icon={AlertTriangle}
              status={getStatus(metrics.injury, true)}
            />
            <FuturisticMetricCard
              title="Performance"
              value={metrics.readiness}
              icon={TrendingUp}
              status={getStatus(metrics.readiness)}
            />
          </div>
        </div>

        {/* Biomechanical Sensors */}
        <div className="mb-6">
          <BiomechanicalGrid data={biomechData} />
        </div>

        {/* Analytics & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <FuturisticTrendChart data={history} />
          </div>
          <div className="lg:col-span-1">
            <AlertsPanel
              stability={metrics.stability}
              fatigue={metrics.fatigue}
              injury={metrics.injury}
              symmetryRatio={biomechData.symmetry_ratio}
              socketPressure={biomechData.socket_pressure}
            />
          </div>
        </div>

        {/* Live Status Bar */}
        {isLive && (
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-xl px-8 py-4 rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/10">
              <div className="relative">
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
                <div className="absolute inset-0 w-3 h-3 bg-cyan-400 rounded-full animate-ping" />
              </div>
              <span className="text-white font-semibold tracking-wide">AI PROCESSING LIVE</span>
              <div className="text-cyan-400 text-sm">● {time}s elapsed</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}