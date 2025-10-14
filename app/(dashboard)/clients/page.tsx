"use client"

import { useState } from "react"
import { Box, CircularProgress, Alert } from "@mui/material"
import { useClients, useDeleteClient } from "@/hooks/use-clients"
import PageBreadcrumbs from "../../../components/PageBreadcrumbs"
import ActionButtons from "./_components/ActionButtons"
import ClientsTable from "./_components/ClientsTable"
import PageFooter from "../../../components/PageFooter"
import { exportClientsToCSV } from "@/lib/csv-export"

type SortField = "firstName" | "lastName" | "address" | "dob" | "email" | "cell" | "comments"

export default function ClientsPage() {
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [page, setPage] = useState(1)
  const limit = 10

  const { data, isLoading, error } = useClients({ page, limit, sortOrder: sortDirection })
  const deleteClientMutation = useDeleteClient()

  const totalPages = data?.pagination?.totalPages || 1
  const total = data?.pagination?.total || 0

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

const handleDownloadCSV = async () => {
  if (!data?.data) return

  try {
    const allClientsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/clients?page=1&limit=1000`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    })

    const allClientsData = await allClientsResponse.json()

    if (allClientsData.status && allClientsData.data?.data) {
      exportClientsToCSV(allClientsData.data.data)
    }
  } catch (error) {
    console.error("CSV download failed:", error)
  }
}


  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const handleEdit = (clientId: string) => {
    console.log("Editing client:", clientId)
  }

  const handleDelete = async (clientId: string) => {
    if (confirm("Are you sure you want to delete this client?")) {
      try {
        await deleteClientMutation.mutateAsync(clientId)
      } catch (error) {
        console.error("Delete failed:", error)
      }
    }
  }

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
        <CircularProgress sx={{ color: "#8b9d8a" }} />
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">Failed to load clients. Please try again.</Alert>
      </Box>
    )
  }

  const clients = data?.data || []

  return (
    <Box sx={{ p: 4, bgcolor: "#f5f5f5", minHeight: "95vh", display: "flex", flexDirection: "column" }}>
      <PageBreadcrumbs />

      <Box sx={{ p: 4, bgcolor: "white", flexGrow: 1, borderRadius: 4 }}> {/* border-radius added */}
        <ActionButtons onDownloadCSV={handleDownloadCSV} />
        <ClientsTable
          clients={clients}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
          onEdit={handleEdit}
          onDelete={handleDelete}
          page={page}
          totalPages={totalPages}
          total={total}
          onPageChange={handlePageChange}
        />
      </Box>

      <Box sx={{ mt: 2 }}>
  <PageFooter />
</Box>
    </Box>

  )
}
