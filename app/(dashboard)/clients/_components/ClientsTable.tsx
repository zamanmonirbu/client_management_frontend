import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Pagination,
  Typography,
} from "@mui/material"
import TableHeaderCell from "./TableHeaderCell"
import ClientTableRow from "./ClientTableRow"

interface Client {
  id: string
  firstName: string
  lastName: string
  address: string
  dob: string
  email: string
  cell: string
  comments: string
}

type SortField = "firstName" | "lastName" | "address" | "dob" | "email" | "cell" | "comments"

interface ClientsTableProps {
  clients: Client[]
  sortField: SortField | null
  sortDirection: "asc" | "desc"
  onSort: (field: SortField) => void
  onEdit: (clientId: string) => void
  onDelete: (clientId: string) => void
  page: number
  totalPages: number
  total: number
  onPageChange: (page: number) => void
}

export default function ClientsTable({
  clients,
  sortField,
  sortDirection,
  onSort,
  onEdit,
  onDelete,
  page,
  totalPages,
  total,
  onPageChange,
}: ClientsTableProps) {
  return (
    <>
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
              <TableHeaderCell
                label="Client Name"
                field="firstName"
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={onSort}
              />
              <TableHeaderCell
                label="Address"
                field="address"
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={onSort}
              />
              <TableHeaderCell
                label="Date"
                field="dob"
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={onSort}
              />
              <TableHeaderCell
                label="Email"
                field="email"
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={onSort}
              />
              <TableHeaderCell
                label="Cell"
                field="cell"
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={onSort}
              />
              <TableHeaderCell
                label="Comments"
                field="comments"
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={onSort}
              />
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => (
              <ClientTableRow
                key={client.id}
                client={client}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 3,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Showing {clients.length > 0 ? (page - 1) * 10 + 1 : 0} to{" "}
          {Math.min(page * 10, total)} of {total} entries
        </Typography>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => onPageChange(value)}
          color="primary"
          sx={{
            "& .MuiPaginationItem-root": {
              color: "#5a6b59",
            },
            "& .Mui-selected": {
              bgcolor: "#8b9d8a !important",
              color: "white",
            },
          }}
        />
      </Box>
    </>
  )
}