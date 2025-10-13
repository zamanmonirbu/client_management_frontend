import { Button } from "@mui/material"

interface LoginButtonProps {
  loading: boolean
  label: string
  loadingLabel: string
}

export default function LoginButton({ loading, label, loadingLabel }: LoginButtonProps) {
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      disabled={loading}
      sx={{
        bgcolor: "#8b9d8a",
        color: "white",
        py: 1.5,
        fontSize: "1rem",
        fontWeight: 600,
        textTransform: "none",
        "&:hover": {
          bgcolor: "#7a8c79",
        },
        "&:disabled": {
          bgcolor: "#c5d0c4",
        },
      }}
    >
      {loading ? loadingLabel : label}
    </Button>
  )
}