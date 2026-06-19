import Card from "./Card";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatCard({
  icon: Icon,
  label,
  value,
  suffix = "",
  delta,
  tone = "indigo",
}) {
  const tones = {
    indigo: "bg-indigo-50 text-indigo-600",
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    red: "bg-red-50 text-red-600",
  };

  return (
    <Card className="p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-start justify-between">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${tones[tone]}`}
        >
          <Icon className="w-5 h-5" />
        </div>

        {delta !== undefined && (
          <span
            className={`flex items-center gap-1 text-xs font-semibold ${
              delta >= 0
                ? "text-emerald-600"
                : "text-red-600"
            }`}
          >
            {delta >= 0 ? (
              <TrendingUp className="w-3.5 h-3.5" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5" />
            )}

            {Math.abs(delta)}%
          </span>
        )}
      </div>

      <p className="text-2xl font-bold text-slate-900 mt-3.5 tracking-tight">
        {value}
        {suffix}
      </p>

      <p className="text-sm text-slate-500 mt-0.5">
        {label}
      </p>
    </Card>
  );
}