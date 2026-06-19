import {
  GraduationCap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { NAV_ITEMS } from "../constants/navigation";

export default function Sidebar({
  page,
  setPage,
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}) {
  const sidebarBody = (
    <div className="flex flex-col h-full">
      <div
        className={`flex items-center gap-2.5 px-4 h-16 border-b border-slate-200 ${
          collapsed ? "justify-center" : ""
        }`}
      >
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
          <GraduationCap className="w-5 h-5 text-white" />
        </div>

        {!collapsed && (
          <div>
            <p className="font-semibold text-slate-900">
              ClassTrack
            </p>

            <p className="text-xs text-slate-400">
              Attendance Dashboard
            </p>
          </div>
        )}
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.key}
              onClick={() => {
                setPage(item.key);
                setMobileOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all
              ${
                page === item.key
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Icon className="w-5 h-5" />

              {!collapsed && (
                <span>{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="hidden lg:flex items-center justify-center gap-2 m-3 px-3 py-2 rounded-xl text-xs hover:bg-slate-100"
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <>
            <ChevronLeft className="w-4 h-4" />
            Collapse
          </>
        )}
      </button>
    </div>
  );

  return (
    <>
      <aside
        className={`hidden lg:flex flex-col border-r border-slate-200 bg-white transition-all
        ${collapsed ? "w-[80px]" : "w-64"}`}
      >
        {sidebarBody}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setMobileOpen(false)}
          />

          <aside className="absolute left-0 top-0 h-full w-64 bg-white">
            {sidebarBody}
          </aside>
        </div>
      )}
    </>
  );
}