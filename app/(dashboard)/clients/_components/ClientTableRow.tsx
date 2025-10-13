import { TableRow, TableCell, Typography, Box, IconButton } from "@mui/material"
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material"

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

interface ClientTableRowProps {
  client: Client
  onEdit: (clientId: string) => void
  onDelete: (clientId: string) => void
}

export default function ClientTableRow({ client, onEdit, onDelete }: ClientTableRowProps) {
  return (
    <TableRow
      sx={{
        "&:nth-of-type(even)": {
          bgcolor: "#fafafa",
        },
        "&:hover": {
          bgcolor: "#f0f4f0",
        },
      }}
    >
      <TableCell sx={{ fontWeight: 500 }}>{`${client.firstName} ${client.lastName}`}</TableCell>
      <TableCell>{client.address}</TableCell>
      <TableCell>{new Date(client.dob).toLocaleDateString()}</TableCell>
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
            onClick={() => onEdit(client.id)}
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
            onClick={() => onDelete(client.id)}
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
  )
}