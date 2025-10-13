"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Box, TextField, Button, Typography, Breadcrumbs, Alert, CircularProgress, Paper } from "@mui/material"
import Link from "next/link"
import { useCurrentUser, useUpdateUser } from "@/hooks/use-user"
// import { useAuth } from "@/contexts/auth-context"

export default function SettingsPage() {
  // const { user: authUser } = useAuth()
  const { data: currentUser, isLoading } = useCurrentUser()
  const updateUserMutation = useUpdateUser()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || "",
        email: currentUser.email || "",
        password: "",
      })
    }
  }, [currentUser])

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!currentUser?.id) return

    try {
      const updateData: Record<string, string> = {
        name: formData.name,
        email: formData.email,
      }

      // Only include password if it's been changed
      if (formData.password) {
        updateData.password = formData.password
      }

      await updateUserMutation.mutateAsync({
        id: currentUser.id,
        data: updateData,
      })

      setSuccess("Profile updated successfully!")
      setFormData((prev) => ({ ...prev, password: "" }))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile")
    }
  }

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
        <CircularProgress sx={{ color: "#8b9d8a" }} />
      </Box>
    )
  }

  return (
    <Box sx={{ p: 4 }}>
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link href="/" style={{ textDecoration: "none", color: "#666" }}>
          Dashboard
        </Link>
        <Typography color="text.primary">Settings</Typography>
      </Breadcrumbs>

      <Paper sx={{ p: 4, maxWidth: 600 }}>
        <Typography
          variant="h5"
          sx={{
            mb: 4,
            fontWeight: 600,
            color: "#2d3a2d",
            borderBottom: "3px solid #2d3a2d",
            display: "inline-block",
            pb: 0.5,
          }}
        >
          User Settings
        </Typography>

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {success}
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              fullWidth
              label="Name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#8b9d8a",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#8b9d8a",
                  },
                },
              }}
            />

            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#8b9d8a",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#8b9d8a",
                  },
                },
              }}
            />

            <TextField
              fullWidth
              label="New Password (leave blank to keep current)"
              type="password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#8b9d8a",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#8b9d8a",
                  },
                },
              }}
            />

            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                disabled={updateUserMutation.isPending}
                sx={{
                  bgcolor: "#8b9d8a",
                  color: "white",
                  px: 4,
                  py: 1.5,
                  fontWeight: 500,
                  "&:hover": {
                    bgcolor: "#6d7e6c",
                  },
                }}
              >
                {updateUserMutation.isPending ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Save Changes"}
              </Button>
            </Box>
          </Box>
        </form>

        <Box sx={{ mt: 4, pt: 3, borderTop: "1px solid #e0e0e0" }}>
          <Typography variant="body2" color="text.secondary">
            <strong>User ID:</strong> {currentUser?.id}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            <strong>Role:</strong> {currentUser?.role}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            <strong>Account Created:</strong>{" "}
            {currentUser?.createdAt ? new Date(currentUser.createdAt).toLocaleDateString() : "N/A"}
          </Typography>
        </Box>
      </Paper>
    </Box>
  )
}
