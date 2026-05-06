import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'


type Option = {
  label: string
  value: any
}
interface Props {
  label: string
  value: string | number
  onChange: (value: number | '') => void
  options: Option[]
}

export default function Dropdown({ label, value, onChange, options }: Props) {
  return (
    <FormControl fullWidth sx={{ minWidth: 150 }}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value || ''}
        label={label}
     MenuProps={{
      disablePortal: true,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left'
      },
      transformOrigin: {
        vertical: 'top',
        horizontal: 'left'
      },
      PaperProps: {
        sx: {
          maxHeight: 300,  
          overflowY: 'auto',
          mt: 1,
          borderRadius: 2
        }
  }
}}
     
          onChange={(e) => {
          const val = e.target.value
          onChange(val === '' ? '' : Number(val))   
        }}
      >
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}