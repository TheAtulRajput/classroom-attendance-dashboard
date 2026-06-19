import { AlertCircle } from "lucide-react";

export default function EmptyState({
  icon: Icon = AlertCircle,
  title,
  subtitle,
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-slate-400" />
      </div>

      <h3 className="text-slate-900 font-semibold text-sm">
        {title}
      </h3>

      {subtitle && (
        <p className="text-slate-500 text-sm mt-1 max-w-sm">
          {subtitle}
        </p>
      )}

      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}