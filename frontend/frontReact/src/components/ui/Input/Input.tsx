import React, { forwardRef } from 'react';
import { TextField, TextFieldProps } from '@mui/material';

interface InputProps extends Omit<TextFieldProps, 'error'> {
  error?: string | null;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, helperText, ...props }, ref) => {
    return (
      <TextField
        {...props}
        inputRef={ref}
        error={!!error}
        helperText={error || helperText}
        variant="outlined"
        size="medium"
        fullWidth
      />
    );
  }
);

export default Input;