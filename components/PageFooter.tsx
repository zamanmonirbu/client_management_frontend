import Link from "next/link"
import { Box, Typography } from "@mui/material"

export default function PageFooter() {
  return (
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
  )
} 