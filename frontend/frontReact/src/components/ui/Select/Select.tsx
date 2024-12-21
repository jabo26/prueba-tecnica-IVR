import React from 'react';
import { 
  FormControl, 
  InputLabel, 
  Select as MuiSelect, 
  MenuItem,
  SelectProps as MuiSelectProps,
  FormHelperText
} from '@mui/material';

interface Option {
  value: string | number;
  label: string;
}

interface SelectProps extends Omit<MuiSelectProps, 'error'> {
  options: Option[];
  label: string;
  error?: string | null;
}

const Select: React.FC<SelectProps> = ({
  options,
  label,
  error,
  ...props
}) => {
  return (
    <FormControl fullWidth error={!!error}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        {...props}
        label={label}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default Select;