import { useState } from "react";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Toast from "../components/Toast";

import DashboardPage from "../pages/DashboardPage";
import StudentsPage from "../pages/StudentsPage";
import AttendancePage from "../pages/AttendancePage";
import ReportsPage from "../pages/ReportsPage";

import { PAGE_META } from "../constants/navigation";
import { useApp } from "../context/AppContext";

export default function AppShell() {
  const [page, setPage] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { toast } = useApp();

  const PageComponent = {
    dashboard: DashboardPage,
    students: StudentsPage,
    attendance: AttendancePage,
    reports: ReportsPage,
  }[page];

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar
        page={page}
        setPage={setPage}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header
          title={PAGE_META[page].title}
          subtitle={PAGE_META[page].subtitle}
          onMenuClick={() => setMobileOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6">
          <PageComponent />
        </main>
      </div>

      <Toast toast={toast} />
    </div>
  );
}