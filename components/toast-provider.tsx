"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { CheckCircle2, X } from "lucide-react";

type Toast = { id: string; title: string; body?: string };
type ToastContextValue = { notify: (toast: Omit<Toast, "id">) => void };

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const notify = useCallback((toast: Omit<Toast, "id">) => {
    const id = crypto.randomUUID();
    setToasts((current) => [...current, { ...toast, id }]);
    window.setTimeout(() => setToasts((current) => current.filter((item) => item.id !== id)), 4200);
  }, []);

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 grid w-[min(92vw,360px)] gap-3">
        {toasts.map((toast) => (
          <div key={toast.id} className="rounded-3xl border border-white/70 bg-white/95 p-4 shadow-2xl backdrop-blur">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
              <div className="flex-1">
                <p className="font-semibold text-slate-900">{toast.title}</p>
                {toast.body ? <p className="mt-1 text-sm text-slate-600">{toast.body}</p> : null}
              </div>
              <button
                aria-label="Dismiss notification"
                className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                onClick={() => setToasts((current) => current.filter((item) => item.id !== toast.id))}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}
