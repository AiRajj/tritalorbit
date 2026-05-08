"use client";

import { Toaster } from "sonner";

export function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      richColors
      toastOptions={{
        style: {
          borderRadius: "14px",
          border: "1px solid #e2e8f0",
        },
      }}
    />
  );
}
