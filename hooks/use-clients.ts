import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/lib/api-client"

export interface Client {
  id: string
  firstName: string
  lastName: string
  address: string
  dob: string
  email: string
  cell: string
  companyName: string
  price: string
  comments: string
  createdAt: string
  updatedAt: string
}

interface ClientsResponse {
  data: Client[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
    sortOrder: string
  }
}

interface ClientsParams {
  page?: number
  limit?: number
  sortOrder?: "asc" | "desc"
}

export function useClients(params: ClientsParams = {}) {
  const { page = 1, limit = 10, sortOrder = "asc" } = params

  return useQuery({
    queryKey: ["clients", page, limit, sortOrder],
    queryFn: async () => {
      const response = await apiClient.get<ClientsResponse>(
        `/clients?page=${page}&limit=${limit}&sortOrder=${sortOrder}`,
      )
      return response.data
    },
  })
}

export function useClient(clientId: string) {
  return useQuery({
    queryKey: ["client", clientId],
    queryFn: async () => {
      const response = await apiClient.get<Client>(`/clients/${clientId}`)
      return response.data
    },
    enabled: !!clientId,
  })
}

export function useCreateClient() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Omit<Client, "id" | "createdAt" | "updatedAt">) => {
      const response = await apiClient.post<Client>("/clients", data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] })
    },
  })
}

export function useUpdateClient() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Client> }) => {
      const response = await apiClient.put<Client>(`/clients/${id}`, data)
      return response.data
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["clients"] })
      queryClient.invalidateQueries({ queryKey: ["client", variables.id] })
    },
  })
}

export function useDeleteClient() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (clientId: string) => {
      await apiClient.delete(`/clients/${clientId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] })
    },
  })
}
