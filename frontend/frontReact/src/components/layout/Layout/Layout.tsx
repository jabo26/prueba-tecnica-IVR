import React from 'react';
import { Box } from '@mui/material';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  return (
    <Box className="layout-container">
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Box className="layout-content">
        <Sidebar open={sidebarOpen} />
        <Box 
          className={`main-content ${
            sidebarOpen ? 'main-content-with-sidebar' : 'main-content-without-sidebar'
          }`}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;