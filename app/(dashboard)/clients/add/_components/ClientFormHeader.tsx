import { Typography } from "@mui/material"

interface ClientFormHeaderProps {
  title: string
}

export default function ClientFormHeader({ title }: ClientFormHeaderProps) {
  return (
    <Typography
      variant="h5"
      sx={{
        mb: 4,
        fontWeight: 600,
        color: "#2d3a2d",
        borderBottom: "3px solid #2d3a2d",
        display: "inline-block",
        pb: 0.5,
      }}
    >
      {title}
    </Typography>
  )
}