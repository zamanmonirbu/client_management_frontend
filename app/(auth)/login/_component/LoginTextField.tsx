import { TextField, InputAdornment, IconButton } from "@mui/material"
import type { SvgIconComponent } from "@mui/icons-material"

interface LoginTextFieldProps {
  label: string
  type: string
  value: string
  onChange: (value: string) => void
  required?: boolean
  startIcon?: SvgIconComponent
  endIcon?: SvgIconComponent
  onEndIconClick?: () => void
  showEndIcon?: boolean
}

export default function LoginTextField({
  label,
  type,
  value,
  onChange,
  required = false,
  startIcon: StartIcon,
  endIcon: EndIcon,
  onEndIconClick,
  showEndIcon,
}: LoginTextFieldProps) {
  return (
    <TextField
      fullWidth
      label={label}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      sx={{ mb: 3 }}
      InputProps={{
        startAdornment: StartIcon && (
          <InputAdornment position="start">
            <StartIcon sx={{ color: "#8b9d8a" }} />
          </InputAdornment>
        ),
        endAdornment: EndIcon && (
          <InputAdornment position="end">
            <IconButton onClick={onEndIconClick} edge="end">
              {showEndIcon ? <EndIcon /> : <EndIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  )
}