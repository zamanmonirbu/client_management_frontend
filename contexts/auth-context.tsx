"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { apiClient } from "@/lib/api-client"
import { setAuthData, getUser, clearAuthData, type User } from "@/lib/auth"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const storedUser = getUser()
    if (storedUser) {
      setUser(storedUser)
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.post<{
        user: User
        accessToken: string
        refreshToken: string
      }>("/users/login", { email, password })

      if (response.status && response.data) {
        const { user, accessToken, refreshToken } = response.data
        setAuthData(user, accessToken, refreshToken)
        setUser(user)
        router.push("/")
      } else {
        throw new Error(response.message || "Login failed")
      }
    } catch (error) {
      console.error(" Login error:", error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await apiClient.post("/users/logout")
    } catch (error) {
      console.error(" Logout error:", error)
    } finally {
      clearAuthData()
      setUser(null)
      router.push("/login")
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("Auth must be used within an AuthProvider")
  }
  return context
}
