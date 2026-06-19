export const SEED_STUDENTS = [
  { id: "STU001", name: "Aarav Sharma", className: "10-A", roll: "01" },
  { id: "STU002", name: "Diya Patel", className: "10-A", roll: "02" },
  { id: "STU003", name: "Kabir Singh", className: "10-A", roll: "03" },
  { id: "STU004", name: "Meera Iyer", className: "10-B", roll: "04" },
  { id: "STU005", name: "Rohan Gupta", className: "10-B", roll: "05" },
  { id: "STU006", name: "Saanvi Reddy", className: "10-B", roll: "06" },
  { id: "STU007", name: "Vihaan Joshi", className: "10-A", roll: "07" },
  { id: "STU008", name: "Anika Verma", className: "10-A", roll: "08" },
];

export function buildSeedAttendance(students) {
  const records = {};
  const today = new Date();

  for (let d = 13; d >= 0; d--) {
    const date = new Date(today);
    date.setDate(today.getDate() - d);

    const dateStr = date.toISOString().slice(0, 10);

    if (date.getDay() === 0 || date.getDay() === 6) continue;

    records[dateStr] = {};

    students.forEach((s) => {
      const base = {
        STU001: 0.95,
        STU002: 0.5,
        STU003: 0.85,
        STU004: 0.9,
        STU005: 0.6,
        STU006: 0.97,
        STU007: 0.8,
        STU008: 0.4,
      }[s.id] ?? 0.8;

      records[dateStr][s.id] =
        Math.random() < base ? "present" : "absent";
    });
  }

  return records;
}

export const todayStr = () =>
  new Date().toISOString().slice(0, 10);