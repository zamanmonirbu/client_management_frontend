const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL!

interface ApiResponse<T> {
  status: boolean
  statusCode: number
  message: string
  data: T
}

class ApiClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private getAccessToken(): string | null {
    if (typeof window === "undefined") return null
    return localStorage.getItem("accessToken")
  }

  private getRefreshToken(): string | null {
    if (typeof window === "undefined") return null
    return localStorage.getItem("refreshToken")
  }

  private setTokens(accessToken: string, refreshToken: string): void {
    if (typeof window === "undefined") return
    localStorage.setItem("accessToken", accessToken)
    localStorage.setItem("refreshToken", refreshToken)
  }

  private clearTokens(): void {
    if (typeof window === "undefined") return
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("user")
  }

  private async refreshAccessToken(): Promise<boolean> {
    const refreshToken = this.getRefreshToken()
    if (!refreshToken) return false

    try {
      const response = await fetch(`${this.baseURL}/users/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      })

      if (!response.ok) {
        this.clearTokens()
        return false
      }

      const result: ApiResponse<{ accessToken: string; refreshToken: string }> =
        await response.json()

      if (result.status && result.data) {
        this.setTokens(result.data.accessToken, result.data.refreshToken)
        return true
      }

      return false
    } catch (error) {
      console.error("Token refresh failed:", error)
      this.clearTokens()
      return false
    }
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const accessToken = this.getAccessToken()

    // ✅ Use Record<string, string> to allow direct mutation
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    }

    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`
    }

    try {
      let response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers,
      })

      // Handle expired access token (401)
      if (response.status === 401) {
        const refreshed = await this.refreshAccessToken()

        if (refreshed) {
          const newAccessToken = this.getAccessToken()
          if (newAccessToken) {
            headers["Authorization"] = `Bearer ${newAccessToken}`
          }

          response = await fetch(`${this.baseURL}${endpoint}`, {
            ...options,
            headers,
          })
        } else {
          // Redirect to login if refresh fails
          if (typeof window !== "undefined") {
            window.location.href = "/login"
          }
          throw new Error("Authentication failed")
        }
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || "Request failed")
      }

      return await response.json()
    } catch (error) {
      console.error("API request failed:", error)
      throw error
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "GET" })
  }

  async post<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "DELETE" })
  }
}

export const apiClient = new ApiClient(API_BASE_URL)
