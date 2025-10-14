"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Box, Button, Typography, Container, Avatar } from "@mui/material"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"
import RefreshIcon from "@mui/icons-material/Refresh"

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter()

  useEffect(() => {
    console.error("Global Error:", error)
  }, [error])

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
      <Avatar
        sx={{
          bgcolor: "#8b9d8a",
          width: 80,
          height: 80,
          mb: 4,
          boxShadow: 3,
          animation: "bounce 1s infinite",
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 50, color: "#ffffff" }} />
      </Avatar>

      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: "#4D5746" }}>
        Something went wrong!
      </Typography>

      <Typography variant="body1" sx={{ color: "#7a8c79", maxWidth: 400, mb: 4 }}>
        We’re sorry, an unexpected error occurred. Don’t worry — you can try again or go back home.
      </Typography>

      {/* Buttons */}
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={reset}
          sx={{
            bgcolor: "#8b9d8a",
            color: "white",
            "&:hover": { bgcolor: "#7a8c79" },
            borderRadius: 3,
            px: 3,
            py: 1.5,
            textTransform: "none",
            boxShadow: 3,
          }}
        >
          Try Again
        </Button>
        <Button
          variant="outlined"
          onClick={() => router.push("/")}
          sx={{
            borderColor: "#8b9d8a",
            color: "#4D5746",
            borderRadius: 3,
            px: 3,
            py: 1.5,
            textTransform: "none",
            "&:hover": { bgcolor: "#e8ede8", borderColor: "#7a8c79" },
          }}
        >
          Go Home
        </Button>
      </Box>
    </Box>
  )
}
