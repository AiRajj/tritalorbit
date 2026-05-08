import { Toaster } from "sonner"

export default function DashboardRouteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <Toaster position="top-right" richColors closeButton />
    </>
  )
}
