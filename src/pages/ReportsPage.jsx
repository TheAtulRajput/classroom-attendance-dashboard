import { useMemo } from "react";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import Card from "../components/Card";
import Badge from "../components/Badge";
import EmptyState from "../components/EmptyState";

import { useApp } from "../context/AppContext";
import { getStudentStats } from "../utils/attendanceUtils";

const PIE_COLORS = ["#10B981", "#EF4444"];

export default function ReportsPage() {
  const { students, attendance } = useApp();

  const stats = useMemo(() => {
    return students.map((student) => ({
      ...student,
      ...getStudentStats(student.id, attendance),
    }));
  }, [students, attendance]);

  if (students.length === 0) {
    return (
      <EmptyState
        title="No Data Available"
        subtitle="Add students and mark attendance to view reports."
      />
    );
  }

  const barData = stats.map((s) => ({
    name: s.name.split(" ")[0],
    pct: s.pct,
  }));

  const totals = stats.reduce(
    (acc, s) => ({
      present: acc.present + s.present,
      absent: acc.absent + s.absent,
    }),
    { present: 0, absent: 0 }
  );

  const pieData = [
    {
      name: "Present",
      value: totals.present,
    },
    {
      name: "Absent",
      value: totals.absent,
    },
  ];

  const weeklyData = Object.keys(attendance)
    .sort()
    .slice(-7)
    .map((date) => {
      const record = attendance[date];

      const total = students.length;

      const present = students.filter(
        (s) => record[s.id] === "present"
      ).length;

      return {
        date: new Date(date).toLocaleDateString(
          "en-IN",
          { weekday: "short" }
        ),
        attendance:
          total === 0
            ? 0
            : Math.round(
                (present / total) * 1000
              ) / 10,
      };
    });

  const sorted = [...stats].sort(
    (a, b) => b.pct - a.pct
  );

  const best = sorted[0];
  const worst = sorted[sorted.length - 1];

  const classAvg =
    stats.length === 0
      ? 0
      : Math.round(
          (stats.reduce(
            (a, s) => a + s.pct,
            0
          ) /
            stats.length) *
            10
        ) / 10;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5">
          <p className="text-xs text-slate-500">
            Highest Attendance
          </p>

          <h3 className="text-lg font-bold mt-2">
            {best?.name}
          </h3>

          <div className="mt-2">
            <Badge pct={best?.pct || 0} />
          </div>
        </Card>

        <Card className="p-5">
          <p className="text-xs text-slate-500">
            Lowest Attendance
          </p>

          <h3 className="text-lg font-bold mt-2">
            {worst?.name}
          </h3>

          <div className="mt-2">
            <Badge pct={worst?.pct || 0} />
          </div>
        </Card>

        <Card className="p-5">
          <p className="text-xs text-slate-500">
            Class Average
          </p>

          <h3 className="text-lg font-bold mt-2">
            {classAvg}%
          </h3>

          <div className="mt-2">
            <Badge pct={classAvg} />
          </div>
        </Card>
      </div>

      {/* Charts */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <h3 className="font-semibold mb-4">
            Attendance by Student
          </h3>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Bar
                dataKey="pct"
                fill="#4F46E5"
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <h3 className="font-semibold mb-4">
            Present vs Absent
          </h3>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
              >
                {pieData.map((entry, idx) => (
                  <Cell
                    key={entry.name}
                    fill={
                      PIE_COLORS[idx]
                    }
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5 lg:col-span-2">
          <h3 className="font-semibold mb-4">
            Weekly Attendance Trend
          </h3>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="attendance"
                stroke="#3B82F6"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}