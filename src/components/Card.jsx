export default function Card({ className = "", children }) {
  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200/80 shadow-sm shadow-slate-200/40 ${className}`}
    >
      {children}
    </div>
  );
}