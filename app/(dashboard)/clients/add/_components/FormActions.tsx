import { Box, Button, CircularProgress } from "@mui/material"

interface FormActionsProps {
  onBack: () => void
  onNext: () => void
  isLoading?: boolean
  backLabel?: string
  nextLabel?: string
}

export default function FormActions({
  onBack,
  onNext,
  isLoading = false,
  backLabel = "BACK",
  nextLabel = "NEXT",
}: FormActionsProps) {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 6 }}>
      <Button
        variant="outlined"
        onClick={onBack}
        disabled={isLoading}
        sx={{
          px: 5,
          py: 1.5,
          borderColor: "#333",
          color: "#333",
          fontWeight: 500,
          "&:hover": {
            borderColor: "#333",
            bgcolor: "#f5f5f5",
          },
        }}
      >
        {backLabel}
      </Button>
      <Button
        variant="contained"
        onClick={onNext}
        disabled={isLoading}
        sx={{
          px: 5,
          py: 1.5,
          bgcolor: "#8b9d8a",
          color: "white",
          fontWeight: 500,
          "&:hover": {
            bgcolor: "#6d7e6c",
          },
        }}
      >
        {isLoading ? <CircularProgress size={24} sx={{ color: "white" }} /> : nextLabel}
      </Button>
    </Box>
  )
}