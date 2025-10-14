export interface User {
  id: string
  email: string
  name: string
  role: string
  userImage: string | null
  createdAt: string
  updatedAt: string
}

export const setAuthData = (user: User, accessToken: string, refreshToken: string): void => {
  if (typeof window === "undefined") return
  sessionStorage.setItem("user", JSON.stringify(user))
  sessionStorage.setItem("accessToken", accessToken)
  sessionStorage.setItem("refreshToken", refreshToken)
}

export const getUser = (): User | null => {
  if (typeof window === "undefined") return null
  const userStr = sessionStorage.getItem("user")
  if (!userStr) return null
  try {
    return JSON.parse(userStr)
  } catch {
    return null
  }
}

export const clearAuthData = (): void => {
  if (typeof window === "undefined") return
  sessionStorage.removeItem("user")
  sessionStorage.removeItem("accessToken")
  sessionStorage.removeItem("refreshToken")
}

export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false
  return !!sessionStorage.getItem("accessToken")
}