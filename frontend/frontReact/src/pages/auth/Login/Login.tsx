import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Alert,
  Grid
} from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../../../context/AuthContext';
import { authService } from '../../../services/auth.service';
import Input from '../../../components/ui/Input/Input';
import Button from '../../../components/ui/Button/Button';
import './Login.css';

interface LoginCredentials {
  username: string;
  password: string;
}

const schema = yup.object().shape({
  username: yup.string().required('El usuario es requerido'),
  password: yup.string().required('La contraseña es requerida')
});

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: '',
      password: ''
    }
  });

  const onSubmit = async (data: LoginCredentials) => {
    setLoading(true);
    setError('');
    debugger;
    try {
      const response = await authService.login({
        username: data.username,
        password: data.password
      });

      localStorage.setItem('token', response.access_token);

      login({
        username: data.username,
        token: response.access_token
      });

      console.log('Login exitoso, navegando a /empleados');
      navigate('/empleados');
    } catch (err) {
      console.error('Error en login:', err);
      setError('Usuario o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="login-container">
      <Grid container className="login-grid">
        {/* Lado izquierdo - Banner */}
        <Grid item xs={12} md={7} className="login-banner">
          <Box className="banner-content">
            <img 
              src="../../../assets/konecta-logo.png" 
              alt="Konecta Logo" 
              className="login-logo"
            />
            <Typography variant="h3" className="banner-title">
              Bienvenido a Konecta
            </Typography>
            <Typography variant="h6" className="banner-subtitle">
             Prueba Técinica - IVR
            </Typography>
          </Box>
        </Grid>

        {/* Lado derecho - Formulario */}
        <Grid item xs={12} md={5} className="login-form-container">
          <Paper elevation={0} className="login-paper">
            <Typography variant="h4" component="h1" className="login-title">
              Iniciar Sesión
            </Typography>

            {error && (
              <Alert severity="error" className="login-alert">
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="login-form">
              <Input
                {...register('username')}
                name="username"
                label="Usuario"
                error={errors.username?.message}
                fullWidth
                autoComplete="username"
              />

              <Input
                {...register('password')}
                name="password"
                type="password"
                label="Contraseña"
                error={errors.password?.message}
                fullWidth
                autoComplete="current-password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                loading={loading}
                size="large"
              >
                Ingresar
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;