import { Box, TextField, Typography, InputAdornment } from "@mui/material"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"

interface FormTextFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
  required?: boolean
  showCheckIcon?: boolean
}

export default function FormTextField({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  required = false,
  showCheckIcon = false,
}: FormTextFieldProps) {
  return (
    <Box>
      <Typography sx={{ mb: 1, fontWeight: 500, color: "#333", fontSize: "14px" }}>
        {label}
        {required && " *"}
      </Typography>
      <TextField
        fullWidth
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        variant="standard"
        required={required}
        InputProps={{
          endAdornment: showCheckIcon && value && (
            <InputAdornment position="end">
              <CheckCircleIcon sx={{ color: "#4caf50", fontSize: 20 }} />
            </InputAdornment>
          ),
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