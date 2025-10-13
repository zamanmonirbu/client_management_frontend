"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Box,
  Typography,
  Breadcrumbs,
} from "@mui/material"
import {
  Download as DownloadIcon,
  Add as AddIcon,
  ArrowUpward,
  ArrowDownward,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material"

interface Client {
  id: string
  name: string
  address: string
  date: string
  email: string
  cell: string
  comments: string
}

const mockClients: Client[] = [
  {
    id: "1",
    name: "Tommie Bennett",
    address: "13th St, New York, NY",
    date: "09/19/2024",
    email: "testdrive@snss.com",
    cell: "+16102441567",
    comments:
      "You'll get the most out of this guide if your desire to learn search engine optimization (SEO) is exceeded only by your...",
  },
  {
    id: "2",
    name: "Margarita Fisk",
    address: "13th St, New York, NY",
    date: "09/22/2024",
    email: "testdrive@snss.com",
    cell: "+16102441567",
    comments:
      "I'd be happy to provide some reviews! However, I'll need more specific information about what you'd like a review of...",
  },
  {
    id: "3",
    name: "Peter A. Ayotte",
    address: "13th St, New York, NY",
    date: "09/26/2024",
    email: "testdrive@snss.com",
    cell: "+16102441567",
    comments:
      "Creative Niloy is a best SEO service provider in Bangladesh I have ever seen. He does a great job of providing top-notch...",
  },
  {
    id: "4",
    name: "Katia Alexander",
    address: "13th St, New York, NY",
    date: "09/28/2024",
    email: "testdrive@snss.com",
    cell: "+16102441567",
    comments:
      "Creative Niloy is a best seo service provider in Bangladesh. We are offering professional web design and seo services like...",
  },
  {
    id: "5",
    name: "Rochelle Curry",
    address: "13th St, New York, NY",
    date: "09/30/2024",
    email: "testdrive@snss.com",
    cell: "+16102441567",
    comments:
      "You'll get the most out of this guide if your desire to learn search engine optimization (SEO) is exceeded only by your...",
  },
]

type SortField = "name" | "address" | "date" | "email" | "cell" | "comments"

export default function ClientsPage() {
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const handleDownloadCSV = () => {
    // CSV download logic would go here
    console.log("Downloading CSV...")
  }

  const handleEdit = (clientId: string) => {
    console.log("Editing client:", clientId)
    // Navigate to edit page or open edit modal
  }

  const handleDelete = (clientId: string) => {
    console.log("Deleting client:", clientId)
    // Show confirmation dialog and delete client
  }

  return (
    <Box sx={{ p: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link href="/dashboard" style={{ textDecoration: "none", color: "#666" }}>
          Dashboard
        </Link>
        <Typography color="text.primary">Clients</Typography>
      </Breadcrumbs>

      {/* Action Buttons */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={handleDownloadCSV}
          sx={{
            borderColor: "#8b9d8a",
            color: "#5a6b59",
            "&:hover": {
              borderColor: "#6d7e6c",
              bgcolor: "#f0f4f0",
            },
          }}
        >
          Download CSV
        </Button>
        <Button
          component={Link}
          href="/clients/add"
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            bgcolor: "#8b9d8a",
            color: "white",
            "&:hover": {
              bgcolor: "#6d7e6c",
            },
          }}
        >
          Add New Client
        </Button>
      </Box>

      {/* Material UI Table */}
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          borderRadius: 2,
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                bgcolor: "#c4d3c3",
                "& th": {
                  fontWeight: 600,
                  color: "#2d3a2d",
                },
              }}
            >
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  Client Name
                  <IconButton size="small" onClick={() => handleSort("name")}>
                    {sortField === "name" && sortDirection === "asc" ? (
                      <ArrowUpward fontSize="small" />
                    ) : (
                      <ArrowDownward fontSize="small" />
                    )}
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  Address
                  <IconButton size="small" onClick={() => handleSort("address")}>
                    {sortField === "address" && sortDirection === "asc" ? (
                      <ArrowUpward fontSize="small" />
                    ) : (
                      <ArrowDownward fontSize="small" />
                    )}
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  Date
                  <IconButton size="small" onClick={() => handleSort("date")}>
                    {sortField === "date" && sortDirection === "asc" ? (
                      <ArrowUpward fontSize="small" />
                    ) : (
                      <ArrowDownward fontSize="small" />
                    )}
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  Email
                  <IconButton size="small" onClick={() => handleSort("email")}>
                    {sortField === "email" && sortDirection === "asc" ? (
                      <ArrowUpward fontSize="small" />
                    ) : (
                      <ArrowDownward fontSize="small" />
                    )}
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  Cell
                  <IconButton size="small" onClick={() => handleSort("cell")}>
                    {sortField === "cell" && sortDirection === "asc" ? (
                      <ArrowUpward fontSize="small" />
                    ) : (
                      <ArrowDownward fontSize="small" />
                    )}
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  Comments
                  <IconButton size="small" onClick={() => handleSort("comments")}>
                    {sortField === "comments" && sortDirection === "asc" ? (
                      <ArrowUpward fontSize="small" />
                    ) : (
                      <ArrowDownward fontSize="small" />
                    )}
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockClients.map((client, index) => (
              <TableRow
                key={client.id}
                sx={{
                  "&:nth-of-type(even)": {
                    bgcolor: "#fafafa",
                  },
                  "&:hover": {
                    bgcolor: "#f0f4f0",
                  },
                }}
              >
                <TableCell sx={{ fontWeight: 500 }}>{client.name}</TableCell>
                <TableCell>{client.address}</TableCell>
                <TableCell>{client.date}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.cell}</TableCell>
                <TableCell sx={{ maxWidth: 300 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {client.comments}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                    <IconButton
                      size="small"
                      onClick={() => handleEdit(client.id)}
                      sx={{
                        color: "#5a6b59",
                        "&:hover": {
                          bgcolor: "#e8f0e8",
                          color: "#3d4d3c",
                        },
                      }}
                      aria-label="edit"
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(client.id)}
                      sx={{
                        color: "#d32f2f",
                        "&:hover": {
                          bgcolor: "#ffebee",
                          color: "#c62828",
                        },
                      }}
                      aria-label="delete"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Footer */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 4,
          pt: 3,
          borderTop: "1px solid #e0e0e0",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Copyright @ Realseo.digital 2023
        </Typography>
        <Box sx={{ display: "flex", gap: 3 }}>
          <Link href="/terms" style={{ textDecoration: "none", color: "#666", fontSize: "14px" }}>
            Terms and Conditions
          </Link>
          <Link href="/privacy" style={{ textDecoration: "none", color: "#666", fontSize: "14px" }}>
            Privacy Policy
          </Link>
        </Box>
      </Box>
    </Box>
  )
}
