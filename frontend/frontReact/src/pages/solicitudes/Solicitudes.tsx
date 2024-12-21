import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { solicitudesService, Solicitud, CreateSolicitudDto } from '../../services/solicitudes.service';
import Button from '../../components/ui/Button/Button';
import SolicitudForm from './components/SolicitudForm';
import './Solicitudes.css';

const Solicitudes: React.FC = () => {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSolicitudes();
  }, []);

  const fetchSolicitudes = async () => {
    try {
      const data = await solicitudesService.getAll();
      setSolicitudes(data);
    } catch (error) {
      console.error('Error fetching solicitudes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleSaveSolicitud = async (solicitud: CreateSolicitudDto) => {
    try {
      await solicitudesService.create(solicitud);
      fetchSolicitudes();
      handleCloseForm();
    } catch (error) {
      console.error('Error saving solicitud:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Está seguro de eliminar esta solicitud?')) {
      try {
        await solicitudesService.delete(id);
        fetchSolicitudes();
      } catch (error) {
        console.error('Error deleting solicitud:', error);
      }
    }
  };

  return (
    <Box className="solicitudes-container" sx={{ width: '100%' }}>
      <Box className="solicitudes-header">
        <Typography variant="h4">Solicitudes</Typography>
        <Button
          onClick={handleOpenForm}
          startIcon={<AddIcon />}
        >
          Nueva Solicitud
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Resumen</TableCell>
              <TableCell>Empleado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {solicitudes.map((solicitud) => (
              <TableRow key={solicitud.id}>
                <TableCell>{solicitud.codigo}</TableCell>
                <TableCell>{solicitud.descripcion}</TableCell>
                <TableCell>{solicitud.resumen}</TableCell>
                <TableCell>{solicitud.empleado?.nombre}</TableCell>
                <TableCell>
                  <IconButton 
                    onClick={() => handleDelete(solicitud.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <SolicitudForm
        open={openForm}
        onClose={handleCloseForm}
        onSave={handleSaveSolicitud}
      />
    </Box>
  );
};

export default Solicitudes;