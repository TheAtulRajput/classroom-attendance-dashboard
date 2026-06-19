export default function Badge({ pct }) {
  const tone =
    pct >= 85
      ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20"
      : pct >= 70
      ? "bg-amber-50 text-amber-700 ring-amber-600/20"
      : "bg-red-50 text-red-700 ring-red-600/20";

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ring-1 ring-inset ${tone}`}
    >
      {pct}%
    </span>
  );
}