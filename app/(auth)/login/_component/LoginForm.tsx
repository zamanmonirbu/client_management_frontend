import type React from "react"
import { useState } from "react"
import { Alert } from "@mui/material"
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material"
import LoginTextField from "./LoginTextField"
import LoginButton from "./LoginButton"

export interface LoginFormData {
  email: string
  password: string
}

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>
  loading: boolean
  error: string
}

export default function LoginForm({ onSubmit, loading, error }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit({ email, password })
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <LoginTextField
        label="Email Address"
        type="email"
        value={email}
        onChange={setEmail}
        required
        startIcon={Email}
      />

      <LoginTextField
        label="Password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={setPassword}
        required
        startIcon={Lock}
        endIcon={showPassword ? VisibilityOff : Visibility}
        onEndIconClick={() => setShowPassword(!showPassword)}
        showEndIcon={showPassword}
      />

      <LoginButton loading={loading} label="Sign In" loadingLabel="Signing in..." />
    </form>
  )
}