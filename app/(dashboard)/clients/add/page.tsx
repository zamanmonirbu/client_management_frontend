"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Box, Alert, CircularProgress } from "@mui/material"
import { useCreateClient } from "@/hooks/use-clients"
import PageBreadcrumbs from "../../../../components/PageBreadcrumbs"
import PageFooter from "../../../../components/PageFooter"
import ClientFormHeader from "./_components/ClientFormHeader"
import ClientForm from "./_components/ClientForm"
import FormActions from "./_components/FormActions"

export interface ClientFormData {
  firstName: string
  lastName: string
  address: string
  dob: string
  email: string
  cell: string
  companyName: string
  price: string
  comments: string
}

export default function AddClientPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const createClientMutation = useCreateClient()

  const [formData, setFormData] = useState<ClientFormData>({
    firstName: "",
    lastName: "",
    address: "",
    dob: "",
    email: "",
    cell: "",
    companyName: "",
    price: "",
    comments: "",
  })

  const handleChange = (field: keyof ClientFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleBack = () => {
    router.push("/clients")
  }

  const handleNext = async () => {
    setError("")

    if (!formData.firstName || !formData.lastName || !formData.email) {
      setError("Please fill in all required fields")
      return
    }

    try {
      await createClientMutation.mutateAsync(formData)
      router.push("/clients")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create client")
    }
  }

  if (createClientMutation.isPending) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
        <CircularProgress sx={{ color: "#8b9d8a" }} />
      </Box>
    )
  }

  return (
    <Box sx={{ p: 4, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      <PageBreadcrumbs currentPage="Clients" />

      <Box sx={{ bgcolor: "white", p: 4, borderRadius: 1 }}>
        <ClientFormHeader title="Add New Client" />

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <ClientForm formData={formData} onChange={handleChange} />

        <FormActions
          onBack={handleBack}
          onNext={handleNext}
          isLoading={createClientMutation.isPending}
          backLabel="BACK"
          nextLabel="NEXT"
        />
      </Box>

      <PageFooter />
    </Box>
  )
}