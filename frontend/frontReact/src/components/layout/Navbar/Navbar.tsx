import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Button,
  Box 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useAuth } from '../../../context/AuthContext';
import './Navbar.css';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <AppBar position="fixed" className="navbar">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={onMenuClick}
          className="menu-button"
        >
          <MenuIcon />
        </IconButton>
        {/* <div className="logo-container">
          <img 
            src="../assets/konecta-logo.png"
            alt="Konecta Logo" 
            className="navbar-logo"
          />
        </div> */}
        <Typography variant="h6" className="title">
          Prueba
        </Typography>
        <Box className="user-section">
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <Button color="inherit" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;