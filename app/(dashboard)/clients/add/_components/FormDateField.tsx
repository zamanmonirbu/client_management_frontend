import { Box, TextField, Typography } from "@mui/material"

interface FormDateFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
}

export default function FormDateField({ label, value, onChange }: FormDateFieldProps) {
  return (
    <Box>
      <Typography sx={{ mb: 1, fontWeight: 500, color: "#333", fontSize: "14px" }}>
        {label}
      </Typography>
      <TextField
        fullWidth
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        variant="standard"
        InputLabelProps={{
          shrink: true,
        }}
        sx={{
          "& .MuiInput-underline:before": {
            borderBottomColor: "#e0e0e0",
          },
          "& .MuiInput-underline:hover:before": {
            borderBottomColor: "#8b9d8a",
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "#8b9d8a",
          },
        }}
      />
    </Box>
  )
}