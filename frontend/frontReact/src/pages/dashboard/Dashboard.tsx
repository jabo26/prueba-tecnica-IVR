import React, { useEffect, useState } from 'react';
import { Box, Grid, Card, CardContent, Typography } from '@mui/material';
import { PeopleAlt, AssignmentTurnedIn } from '@mui/icons-material';
import { empleadosService } from '../../services/empleados.service';
import { solicitudesService } from '../../services/solicitudes.service';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalEmpleados: 0,
    totalSolicitudes: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [empleados, solicitudes] = await Promise.all([
        empleadosService.getAll(),
        solicitudesService.getAll()
      ]);

      setStats({
        totalEmpleados: empleados.length,
        totalSolicitudes: solicitudes.length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <Box className="dashboard-container">
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card className="stat-card empleados-card">
            <CardContent>
              <Box className="stat-content">
                <Box className="stat-icon">
                  <PeopleAlt fontSize="large" />
                </Box>
                <Box className="stat-info">
                  <Typography variant="h3">
                    {stats.totalEmpleados}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Empleados Totales
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card className="stat-card solicitudes-card">
            <CardContent>
              <Box className="stat-content">
                <Box className="stat-icon">
                  <AssignmentTurnedIn fontSize="large" />
                </Box>
                <Box className="stat-info">
                  <Typography variant="h3">
                    {stats.totalSolicitudes}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Solicitudes Totales
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;