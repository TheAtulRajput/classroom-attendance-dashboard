import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  BarChart3,
} from "lucide-react";

export const NAV_ITEMS = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    key: "students",
    label: "Students",
    icon: Users,
  },
  {
    key: "attendance",
    label: "Attendance",
    icon: ClipboardCheck,
  },
  {
    key: "reports",
    label: "Reports",
    icon: BarChart3,
  },
];

export const PAGE_META = {
  dashboard: {
    title: "Dashboard",
    subtitle: "Overview of class attendance health",
  },
  students: {
    title: "Students",
    subtitle: "Manage your class roster",
  },
  attendance: {
    title: "Mark Attendance",
    subtitle: "Record today's attendance",
  },
  reports: {
    title: "Reports",
    subtitle: "Analytics and insights",
  },
};