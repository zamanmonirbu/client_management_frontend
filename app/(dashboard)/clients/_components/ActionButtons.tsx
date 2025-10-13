import Link from "next/link"
import { Box, Button } from "@mui/material"
import { Download as DownloadIcon, Add as AddIcon } from "@mui/icons-material"

interface ActionButtonsProps {
  onDownloadCSV: () => void
}

export default function ActionButtons({ onDownloadCSV }: ActionButtonsProps) {
  return (
    <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
      <Button
        variant="outlined"
        startIcon={<DownloadIcon />}
        onClick={onDownloadCSV}
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
  )
}