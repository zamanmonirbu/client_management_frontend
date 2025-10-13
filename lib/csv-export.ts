import type { Client } from "@/hooks/use-clients"

export function exportClientsToCSV(clients: Client[]): void {
  const headers = [
    "ID",
    "First Name",
    "Last Name",
    "Address",
    "Date of Birth",
    "Email",
    "Cell",
    "Company Name",
    "Price",
    "Comments",
    "Created At",
    "Updated At",
  ]

  const rows = clients.map((client) => [
    client.id,
    client.firstName,
    client.lastName,
    client.address,
    new Date(client.dob).toLocaleDateString(),
    client.email,
    client.cell,
    client.companyName,
    client.price,
    client.comments,
    new Date(client.createdAt).toLocaleString(),
    new Date(client.updatedAt).toLocaleString(),
  ])

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")),
  ].join("\n")

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)

  link.setAttribute("href", url)
  link.setAttribute("download", `clients_${new Date().toISOString().split("T")[0]}.csv`)
  link.style.visibility = "hidden"

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
