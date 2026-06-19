import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Users, UserCheck, UserX, Percent } from "lucide-react";

import StatCard from "../components/StatCard";
import Card from "../components/Card";
import Badge from "../components/Badge";
import EmptyState from "../components/EmptyState";

import { useApp } from "../context/AppContext";
import { getStudentStats } from "../utils/attendanceUtils";

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export default function DashboardPage() {
  const { students, attendance } = useApp();

  const stats = useMemo(() => {
    return students.map((student) => ({
      ...student,
      ...getStudentStats(student.id, attendance),
    }));
  }, [students, attendance]);

  const today = todayStr();
  const todayRecord = attendance[today] || {};

  const presentToday = students.filter(
    (s) => todayRecord[s.id] === "present"
  ).length;

  const absentToday = students.filter(
    (s) => todayRecord[s.id] === "absent"
  ).length;

  const overallPct =
    stats.length === 0
      ? 0
      : Math.round(
          (stats.reduce((a, s) => a + s.pct, 0) /
            stats.length) *
            10
        ) / 10;

  const trendData = useMemo(() => {
    const dates = Object.keys(attendance)
      .sort()
      .slice(-10);

    return dates.map((date) => {
      const record = attendance[date];

      const total = students.length;

      const present = students.filter(
        (s) => record[s.id] === "present"
      ).length;

      return {
        date: new Date(date).toLocaleDateString(
          "en-IN",
          {
            day: "2-digit",
            month: "short",
          }
        ),
        attendance:
          total === 0
            ? 0
            : Math.round((present / total) * 1000) /
              10,
      };
    });
  }, [attendance, students]);

  const sorted = [...stats].sort(
    (a, b) => b.pct - a.pct
  );

  const best = sorted[0];
  const worst = sorted[sorted.length - 1];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          label="Total Students"
          value={students.length}
          tone="indigo"
        />

        <StatCard
          icon={UserCheck}
          label="Present Today"
          value={presentToday}
          tone="emerald"
        />

        <StatCard
          icon={UserX}
          label="Absent Today"
          value={absentToday}
          tone="red"
        />

        <StatCard
          icon={Percent}
          label="Overall Attendance"
          value={overallPct}
          suffix="%"
          tone="blue"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 p-5">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">
            Attendance Trend
          </h3>

          {trendData.length === 0 ? (
            <EmptyState
              title="No attendance data"
              subtitle="Mark attendance to see trends."
            />
          ) : (
            <ResponsiveContainer
              width="100%"
              height={260}
            >
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="attendance"
                  stroke="#4F46E5"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Card>

        <Card className="p-5">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">
            Quick Summary
          </h3>

          <div className="space-y-4">
            <div>
              <p className="text-xs text-slate-500">
                Best Attendance
              </p>

              <div className="flex items-center justify-between mt-1">
                <span>{best?.name}</span>
                {best && <Badge pct={best.pct} />}
              </div>
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Lowest Attendance
              </p>

              <div className="flex items-center justify-between mt-1">
                <span>{worst?.name}</span>
                {worst && <Badge pct={worst.pct} />}
              </div>
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Class Average
              </p>

              <div className="flex items-center justify-between mt-1">
                <span>{overallPct}%</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}