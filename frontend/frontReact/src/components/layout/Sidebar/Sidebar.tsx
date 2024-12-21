import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import {
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  Dashboard as DashboardIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

interface SidebarProps {
  open: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ open }) => {
  const navigate = useNavigate();
  const drawerWidth = 240;

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Empleados', icon: <PeopleIcon />, path: '/empleados' },
    { text: 'Solicitudes', icon: <AssignmentIcon />, path: '/solicitudes' }
  ];

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      className="sidebar"
      classes={{
        paper: 'sidebar-paper'
      }}
      sx={{
        width: drawerWidth,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
        },
      }}
    >
      <div className="sidebar-header">
        <img src="../../../assets/konecta-logo.png" alt="Logo" className="logo" />
      </div>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;