import { useMemo, useState } from "react";

import Card from "../components/Card";
import SearchBar from "../components/SearchBar";

import { useApp } from "../context/AppContext";
import { todayStr } from "../utils/seedData";

import {
  Check,
  X as XIcon,
} from "lucide-react";

export default function AttendancePage() {
  const {
    students,
    attendance,
    markAttendance,
  } = useApp();

  const [query, setQuery] = useState("");

  const date = todayStr();

  const todayRecord =
    attendance[date] || {};

  const filtered = useMemo(() => {
    const q = query.toLowerCase();

    return students.filter(
      (student) =>
        student.name
          .toLowerCase()
          .includes(q) ||
        student.id
          .toLowerCase()
          .includes(q) ||
        student.roll
          .toLowerCase()
          .includes(q)
    );
  }, [students, query]);

  return (
    <div className="space-y-5">
      <Card className="p-4">
        <SearchBar
          value={query}
          onChange={setQuery}
        />
      </Card>

      <Card className="overflow-hidden">
        <ul>
          {filtered.map((student) => {
            const status =
              todayRecord[student.id];

            return (
              <li
                key={student.id}
                className="flex items-center justify-between px-5 py-4 border-b"
              >
                <div>
                  <p className="font-medium">
                    {student.name}
                  </p>

                  <p className="text-xs text-slate-500">
                    {student.className} • Roll{" "}
                    {student.roll}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      markAttendance(
                        student.id,
                        "present"
                      )
                    }
                    className={`px-3 py-2 rounded-lg flex items-center gap-2
                    ${
                      status === "present"
                        ? "bg-emerald-600 text-white"
                        : "border border-emerald-200"
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    Present
                  </button>

                  <button
                    onClick={() =>
                      markAttendance(
                        student.id,
                        "absent"
                      )
                    }
                    className={`px-3 py-2 rounded-lg flex items-center gap-2
                    ${
                      status === "absent"
                        ? "bg-red-600 text-white"
                        : "border border-red-200"
                    }`}
                  >
                    <XIcon className="w-4 h-4" />
                    Absent
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </Card>
    </div>
  );
}