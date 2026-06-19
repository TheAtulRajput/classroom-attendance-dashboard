import { Search } from "lucide-react";

export default function SearchBar({
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="relative">
      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={
          placeholder ||
          "Search by name, ID, or roll number..."
        }
        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all"
      />
    </div>
  );
}