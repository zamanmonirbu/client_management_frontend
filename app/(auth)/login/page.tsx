"use client"

import { useState } from "react"
import { Box, Paper } from "@mui/material"
import { useAuth } from "@/contexts/auth-context"
import LoginFormHeader from "./_component/LoginFormHeader"
import LoginForm, { LoginFormData } from "./_component/LoginForm"

export default function LoginPage() {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (formData: LoginFormData) => {
    setError("")
    setLoading(true)

    try {
      await login(formData.email, formData.password)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed. Please check your credentials.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f5f5f5",
        padding: 3,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          maxWidth: 450,
          width: "100%",
          borderRadius: 2,
        }}
      >
        <LoginFormHeader
          logoSrc="/seologo.png"
          title="Welcome Back"
          subtitle="Sign in to access your dashboard"
        />

        <LoginForm onSubmit={handleSubmit} loading={loading} error={error} />
      </Paper>
    </Box>
  )
}