export function getStudentStats(studentId, attendance) {
  let present = 0;
  let total = 0;

  Object.values(attendance).forEach((dayRecord) => {
    const status = dayRecord[studentId];

    if (status === "present" || status === "absent") {
      total += 1;
      if (status === "present") present += 1;
    }
  });

  const pct =
    total === 0
      ? 0
      : Math.round((present / total) * 1000) / 10;

  return {
    present,
    absent: total - present,
    total,
    pct,
  };
}