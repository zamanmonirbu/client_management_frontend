import { Box, Typography, FormControl, Select, MenuItem } from "@mui/material"

interface SelectOption {
  value: string
  label: string
}

interface FormSelectFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  placeholder?: string
}

export default function FormSelectField({
  label,
  value,
  onChange,
  options,
  placeholder = "Please Select",
}: FormSelectFieldProps) {
  return (
    <Box>
      <Typography sx={{ mb: 1, fontWeight: 500, color: "#333", fontSize: "14px" }}>
        {label}
      </Typography>
      <FormControl fullWidth variant="standard">
        <Select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          displayEmpty
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
        >
          <MenuItem value="" disabled>
            {placeholder}
          </MenuItem>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}