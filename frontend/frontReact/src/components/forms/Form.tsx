import React from 'react';
import { Box, Paper } from '@mui/material';
import './Form.css';

interface FormProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  className?: string;
}

const Form: React.FC<FormProps> = ({ children, onSubmit, className }) => {
  return (
    <Paper elevation={2} className="form-container">
      <form onSubmit={onSubmit} className={`form ${className || ''}`}>
        <Box className="form-content">
          {children}
        </Box>
      </form>
    </Paper>
  );
};

export default Form;