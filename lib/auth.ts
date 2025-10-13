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
  localStorage.setItem("user", JSON.stringify(user))
  localStorage.setItem("accessToken", accessToken)
  localStorage.setItem("refreshToken", refreshToken)
}

export const getUser = (): User | null => {
  if (typeof window === "undefined") return null
  const userStr = localStorage.getItem("user")
  if (!userStr) return null
  try {
    return JSON.parse(userStr)
  } catch {
    return null
  }
}

export const clearAuthData = (): void => {
  if (typeof window === "undefined") return
  localStorage.removeItem("user")
  localStorage.removeItem("accessToken")
  localStorage.removeItem("refreshToken")
}

export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false
  return !!localStorage.getItem("accessToken")
}
