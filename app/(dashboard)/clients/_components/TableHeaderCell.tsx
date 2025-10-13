import { TableCell, Box, IconButton } from "@mui/material"
import { ArrowUpward, ArrowDownward } from "@mui/icons-material"

type SortField = "firstName" | "lastName" | "address" | "dob" | "email" | "cell" | "comments"

interface TableHeaderCellProps {
  label: string
  field: SortField
  sortField: SortField | null
  sortDirection: "asc" | "desc"
  onSort: (field: SortField) => void
}

export default function TableHeaderCell({
  label,
  field,
  sortField,
  sortDirection,
  onSort,
}: TableHeaderCellProps) {
  return (
    <TableCell>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {label}
        <IconButton size="small" onClick={() => onSort(field)}>
          {sortField === field && sortDirection === "asc" ? (
            <ArrowUpward fontSize="small" />
          ) : (
            <ArrowDownward fontSize="small" />
          )}
        </IconButton>
      </Box>
    </TableCell>
  )
}