"use client"

import { Box, Button, Typography } from "@mui/material"
import SearchOffIcon from "@mui/icons-material/SearchOff"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { useRouter } from "next/navigation"

export default function NotFound() {
  const router = useRouter()

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        bgcolor: "#f5f5f5", 
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 2,
      }}
    >
      <Box
        sx={{
          bgcolor: "#8b9d8a",
          p: 4,
          borderRadius: "50%",
          mb: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: 3,
          animation: "bounce 1s infinite",
        }}
      >
        <SearchOffIcon sx={{ fontSize: 60, color: "#ffffff" }} />
      </Box>

      <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ color: "#4D5746" }}>
        Page Not Found
      </Typography>

      <Typography variant="body1" color="#7a8c79" mb={4} sx={{ maxWidth: 360 }}>
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </Typography>

      <Button
        variant="contained"
        startIcon={<ArrowBackIcon />}
        onClick={() => router.push("/")}
        sx={{
          bgcolor: "#8b9d8a",
          color: "white",
          "&:hover": { bgcolor: "#7a8c79" },
          borderRadius: 3,
          textTransform: "none",
          px: 3,
          py: 1.5,
          fontSize: "1rem",
          boxShadow: 3,
        }}
      >
        Back to Home
      </Button>
    </Box>
  )
}
