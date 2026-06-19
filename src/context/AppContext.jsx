import { createContext, useContext, useState, useEffect, useCallback } from "react";

import { loadFromStorage, saveToStorage } from "../utils/storage";
import { SEED_STUDENTS, buildSeedAttendance, todayStr } from "../utils/seedData";

const AppContext = createContext(null);

export const useApp = () => useContext(AppContext);

export function AppProvider({ children }) {
  const [students, setStudents] = useState(() =>
    loadFromStorage("cad_students", SEED_STUDENTS)
  );

  const [attendance, setAttendance] = useState(() => {
    const stored = loadFromStorage("cad_attendance", null);

    if (stored) return stored;

    return buildSeedAttendance(
      loadFromStorage("cad_students", SEED_STUDENTS)
    );
  });

  const [toast, setToast] = useState(null);

  useEffect(() => {
    saveToStorage("cad_students", students);
  }, [students]);

  useEffect(() => {
    saveToStorage("cad_attendance", attendance);
  }, [attendance]);

  const showToast = useCallback((message, kind = "success") => {
    setToast({
      message,
      kind,
      id: Date.now(),
    });
  }, []);

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, 2500);

    return () => clearTimeout(timer);
  }, [toast]);

  const addStudent = useCallback((student) => {
    setStudents((prev) => [...prev, student]);
  }, []);

  const updateStudent = useCallback((id, patch) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id
          ? { ...student, ...patch }
          : student
      )
    );
  }, []);

  const deleteStudent = useCallback((id) => {
    setStudents((prev) =>
      prev.filter((student) => student.id !== id)
    );

    setAttendance((prev) => {
      const next = {};

      Object.entries(prev).forEach(([date, dayRecord]) => {
        const { [id]: removed, ...rest } = dayRecord;
        next[date] = rest;
      });

      return next;
    });
  }, []);

  const markAttendance = useCallback(
    (studentId, status, date = todayStr()) => {
      setAttendance((prev) => ({
        ...prev,
        [date]: {
          ...(prev[date] || {}),
          [studentId]: status,
        },
      }));
    },
    []
  );

  const value = {
    students,
    attendance,
    toast,
    showToast,
    addStudent,
    updateStudent,
    deleteStudent,
    markAttendance,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}