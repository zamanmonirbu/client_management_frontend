import type React from "react"
import { ProtectedRoute } from "@/components/protected-route"
import DashboardLayout from "@/components/DashboardSidebar"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <DashboardLayout>{children}</DashboardLayout>
    </ProtectedRoute>
  )
}
