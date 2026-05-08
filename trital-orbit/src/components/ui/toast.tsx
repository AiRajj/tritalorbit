"use client";

import { Toaster } from "sonner";

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      richColors
      closeButton
      toastOptions={{
        style: {
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
          borderRadius: "0.75rem",
          border: "1px solid #E2E8F0",
          boxShadow: "0 10px 25px -5px rgba(11, 60, 93, 0.12)",
        },
      }}
    />
  );
}
