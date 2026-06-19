import { useState, useMemo } from "react";

import Card from "../components/Card";
import Badge from "../components/Badge";
import SearchBar from "../components/SearchBar";

import { useApp } from "../context/AppContext";
import { getStudentStats } from "../utils/attendanceUtils";

import {
    Plus,
    Pencil,
    Trash2,
} from "lucide-react";

export default function StudentsPage() {
    const {
        students,
        attendance,
        deleteStudent,
    } = useApp();

    const [query, setQuery] = useState("");

    const stats = useMemo(() => {
        return students.map((student) => ({
            ...student,
            ...getStudentStats(
                student.id,
                attendance
            ),
        }));
    }, [students, attendance]);

    const filtered = useMemo(() => {
        const q = query.toLowerCase();

        return stats.filter(
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
    }, [stats, query]);

    return (
        <div className="space-y-5">
            {/* <div className="flex flex-col sm:flex-row gap-3 justify-between">
                <div className="max-w-md w-full">
                    <SearchBar
                        value={query}
                        onChange={setQuery}
                    />
                </div>

                <button
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white"
                >
                    <Plus className="w-4 h-4" />
                    Add Student
                </button>
            </div>

            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b">
                                <th className="px-4 py-3 text-left">
                                    ID
                                </th>
                                <th className="px-4 py-3 text-left">
                                    Name
                                </th>
                                <th className="px-4 py-3 text-left">
                                    Class
                                </th>
                                <th className="px-4 py-3 text-left">
                                    Roll
                                </th>
                                <th className="px-4 py-3 text-left">
                                    Attendance
                                </th>
                                <th className="px-4 py-3 text-left">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {filtered.map((student) => (
                                <tr
                                    key={student.id}
                                    className="border-b hover:bg-slate-50"
                                >
                                    <td className="px-4 py-3">
                                        {student.id}
                                    </td>

                                    <td className="px-4 py-3">
                                        {student.name}
                                    </td>

                                    <td className="px-4 py-3">
                                        {student.className}
                                    </td>

                                    <td className="px-4 py-3">
                                        {student.roll}
                                    </td>

                                    <td className="px-4 py-3">
                                        <Badge
                                            pct={student.pct}
                                        />
                                    </td>

                                    <td className="px-4 py-3">
                                        <div className="flex gap-2">
                                            <button>
                                                <Pencil className="w-4 h-4" />
                                            </button>

                                            <button
                                                onClick={() =>
                                                    deleteStudent(
                                                        student.id
                                                    )
                                                }
                                            >
                                                <Trash2 className="w-4 h-4 text-red-600" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card> */}
        </div>
    );
}