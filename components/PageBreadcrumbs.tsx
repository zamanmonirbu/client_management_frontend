// Component: @components/PageBreadcrumbs.tsx
import Link from "next/link"
import { Breadcrumbs, Typography } from "@mui/material"

interface PageBreadcrumbsProps {
  currentPage?: string
}

export default function PageBreadcrumbs({ currentPage = "Clients" }: PageBreadcrumbsProps) {
  return (
    <Breadcrumbs sx={{ mb: 3 }}>
      <Link href="/dashboard" style={{ textDecoration: "none", color: "#666" }}>
        Dashboard
      </Link>
      <Typography color="text.primary">{currentPage}</Typography>
    </Breadcrumbs>
  )
}