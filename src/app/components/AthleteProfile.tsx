import { User, Trophy, Calendar, TrendingUp } from "lucide-react";

interface AthleteProfileProps {
  mode: "athlete" | "coach";
}

export function AthleteProfile({ mode }: AthleteProfileProps) {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20 shadow-2xl">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
          <User className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Sarah Martinez</h3>
          <p className="text-cyan-400 text-sm">100m Sprint • T44 Classification</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-black/30 rounded-xl p-4 border border-purple-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-gray-400">Personal Best</span>
          </div>
          <div className="text-2xl font-bold text-white">12.43s</div>
        </div>

        <div className="bg-black/30 rounded-xl p-4 border border-cyan-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-gray-400">Training Days</span>
          </div>
          <div className="text-2xl font-bold text-white">24</div>
        </div>

        <div className="bg-black/30 rounded-xl p-4 border border-blue-500/20">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-gray-400">Avg Readiness</span>
          </div>
          <div className="text-2xl font-bold text-white">78.2</div>
        </div>
      </div>

      {mode === "coach" && (
        <div className="mt-4 p-4 bg-blue-500/10 rounded-xl border border-blue-400/30">
          <p className="text-blue-300 text-xs">
            <strong>Coach Note:</strong> Athlete showing consistent improvement in gait symmetry over past 2 weeks.
          </p>
        </div>
      )}
    </div>
  );
}
