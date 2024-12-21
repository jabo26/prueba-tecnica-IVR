import React from 'react';
import { Button as MuiButton, ButtonProps } from '@mui/material';
import './Button.css';

interface CustomButtonProps extends ButtonProps {
  loading?: boolean;
}

const Button: React.FC<CustomButtonProps> = ({ 
  children, 
  loading, 
  variant = 'contained',
  ...props 
}) => {
  return (
    <MuiButton
      variant={variant}
      disabled={loading}
      className="custom-button"
      {...props}
    >
      {loading ? 'Cargando...' : children}
    </MuiButton>
  );
};

export default Button;