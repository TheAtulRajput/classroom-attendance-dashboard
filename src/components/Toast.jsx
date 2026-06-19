import { Check, X as XIcon } from "lucide-react";

export default function Toast({ toast }) {
  if (!toast) return null;

  const tone =
    toast.kind === "error"
      ? "bg-red-600"
      : toast.kind === "info"
      ? "bg-slate-800"
      : "bg-emerald-600";

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-[slideUp_0.25s_ease-out]">
      <div
        className={`${tone} text-white px-4 py-3 rounded-xl shadow-lg shadow-black/10 text-sm font-medium flex items-center gap-2`}
      >
        {toast.kind === "error" ? (
          <XIcon className="w-4 h-4" />
        ) : (
          <Check className="w-4 h-4" />
        )}

        {toast.message}
      </div>
    </div>
  );
}