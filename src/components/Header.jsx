import { Menu } from "lucide-react";

export default function Header({
  title,
  subtitle,
  onMenuClick,
}) {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-sm border-b border-slate-200/70">
      <div className="h-16 px-4 sm:px-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-slate-100 text-slate-600 shrink-0"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="min-w-0">
            <h1 className="text-lg font-bold text-slate-900 truncate">
              {title}
            </h1>

            {subtitle && (
              <p className="text-xs text-slate-400 truncate">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full shrink-0">
          {today}
        </div>
      </div>
    </header>
  );
}