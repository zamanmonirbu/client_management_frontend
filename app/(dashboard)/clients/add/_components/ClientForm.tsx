import { Box } from "@mui/material"
import FormTextField from "./FormTextField"
import FormDateField from "./FormDateField"
import FormSelectField from "./FormSelectField"
import { ClientFormData } from "../page"

interface ClientFormProps {
  formData: ClientFormData
  onChange: (field: keyof ClientFormData, value: string) => void
}

const priceOptions = [
  { value: "500", label: "Basic Package - $500" },
  { value: "1000", label: "Standard Package - $1000" },
  { value: "2000", label: "Premium Package - $2000" },
  { value: "5000", label: "Enterprise Package - $5000" },
]

export default function ClientForm({ formData, onChange }: ClientFormProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 4,
        mt: 4,
      }}
    >
      <FormTextField
        label="First Name"
        value={formData.firstName}
        onChange={(value) => onChange("firstName", value)}
        placeholder="Xion"
        required
        showCheckIcon
      />

      <FormTextField
        label="Last Name"
        value={formData.lastName}
        onChange={(value) => onChange("lastName", value)}
        placeholder="Ashly"
        required
        showCheckIcon
      />

      <FormTextField
        label="Address"
        value={formData.address}
        onChange={(value) => onChange("address", value)}
        placeholder="Type your Address"
      />

      <FormDateField
        label="Date of Birth"
        value={formData.dob}
        onChange={(value) => onChange("dob", value)}
      />

      <FormTextField
        label="Contact Email"
        value={formData.email}
        onChange={(value) => onChange("email", value)}
        placeholder="Type your Email"
        type="email"
        required
      />

      <FormTextField
        label="Contact Cell Number"
        value={formData.cell}
        onChange={(value) => onChange("cell", value)}
        placeholder="Type your Cell No"
      />

      <FormTextField
        label="Company Name"
        value={formData.companyName}
        onChange={(value) => onChange("companyName", value)}
        placeholder="Type Here"
      />

      <FormSelectField
        label="Price"
        value={formData.price}
        onChange={(value) => onChange("price", value)}
        options={priceOptions}
        placeholder="Please Select your Packages"
      />

      <FormTextField
        label="Comments"
        value={formData.comments}
        onChange={(value) => onChange("comments", value)}
        placeholder="You'll get"
      />
    </Box>
  )
}