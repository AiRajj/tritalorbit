"use client";
import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      toastOptions={{
        classNames: {
          toast:
            "rounded-xl border border-orbit-deep/10 bg-white text-orbit-slate shadow-elevate",
          title: "text-orbit-deep font-semibold",
          description: "text-slate-600",
          actionButton: "bg-orbit-deep text-white",
          cancelButton: "bg-slate-100 text-slate-700",
        },
      }}
    />
  );
}
