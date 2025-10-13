import { Box, Typography } from "@mui/material"
import Image from "next/image"

interface LoginFormHeaderProps {
  logoSrc: string
  title: string
  subtitle: string
}

export default function LoginFormHeader({ logoSrc, title, subtitle }: LoginFormHeaderProps) {
  return (
    <Box sx={{ textAlign: "center", mb: 4 }}>
      <Image
        src={logoSrc}
        alt="logo"
        width={150}
        height={50}
        style={{ margin: "0 auto", marginBottom: "20px" }}
      />
      <Typography variant="h5" sx={{ fontWeight: 600, color: "#333" }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ color: "#666", mt: 1 }}>
        {subtitle}
      </Typography>
    </Box>
  )
}