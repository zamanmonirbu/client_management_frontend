"use client"

import Link from "next/link"
import { Box, Typography, Button } from "@mui/material"

export default function AdminDashboard() {
  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Admin Dashboard
      </Typography>
      <Button
        component={Link}
        href="/clients"
        variant="contained"
        sx={{
          bgcolor: "#8b9d8a",
          color: "white",
          "&:hover": { bgcolor: "#6d7e6c" },
        }}
      >
        Go to Clients
      </Button>
    </Box>
  )
}
