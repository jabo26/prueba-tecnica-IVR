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
  TableRow
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { empleadosService, Empleado, CreateEmpleadoDto } from '../../services/empleados.service';
import Button from '../../components/ui/Button/Button';
import EmpleadoForm from './components/EmpleadoForm';
import './Empleados.css';

const Empleados: React.FC = () => {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEmpleados();
  }, []);

  const fetchEmpleados = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Iniciando fetch de empleados');
      const data = await empleadosService.getAll();
      console.log('Datos recibidos:', data);
      setEmpleados(data);
    } catch (error) {
      console.error('Error al obtener empleados:', error);
      setError('Error al cargar los empleados');
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

  const handleSaveEmpleado = async (empleado: CreateEmpleadoDto) => {
    try {
      await empleadosService.create(empleado);
      fetchEmpleados();
      handleCloseForm();
    } catch (error) {
      console.error('Error saving empleado:', error);
    }
  };
  
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box className="empleados-container" sx={{ width: '100%' }}>
      <Box className="empleados-header">
        <Typography variant="h4">Empleados</Typography>
        <Button
          onClick={handleOpenForm}
          startIcon={<AddIcon />}
        >
          Nuevo Empleado
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Fecha de Ingreso</TableCell>
              <TableCell>Salario</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {empleados.map((empleado) => (
              <TableRow key={empleado.id}>
                <TableCell>{empleado.id}</TableCell>
                <TableCell>{empleado.nombre}</TableCell>
                <TableCell>{new Date(empleado.fecha_ingreso).toLocaleDateString()}</TableCell>
                <TableCell>
                  {new Intl.NumberFormat('es-CO', {
                    style: 'currency',
                    currency: 'COP'
                  }).format(empleado.salario)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <EmpleadoForm
        open={openForm}
        onClose={handleCloseForm}
        onSave={handleSaveEmpleado}
      />
    </Box>
  );
};

export default Empleados;