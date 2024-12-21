import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  Box
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '../../../components/ui/Input/Input';
import Button from '../../../components/ui/Button/Button';
import './EmpleadoForm.css';

interface EmpleadoFormProps {
  open: boolean;
  empleado?: any;
  onClose: () => void;
  onSave: (data: any) => void;
}

const schema = yup.object().shape({
  nombre: yup.string().required('El nombre es requerido'),
  fecha_ingreso: yup.date().required('La fecha de ingreso es requerida'),
  salario: yup.number()
    .required('El salario es requerido')
    .positive('El salario debe ser positivo')
});

const EmpleadoForm: React.FC<EmpleadoFormProps> = ({
    open,
    empleado,
    onClose,
    onSave
  }) => {
    const { control, handleSubmit, reset, formState: { errors } } = useForm({
      resolver: yupResolver(schema),
      defaultValues: empleado || {
        nombre: '',
        fecha_ingreso: '',
        salario: ''
      }
    });

  React.useEffect(() => {
    if (empleado) {
      reset(empleado);
    }
  }, [empleado, reset]);

  const onSubmit = (data: any) => {
    onSave(data);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {empleado ? 'Editar Empleado' : 'Nuevo Empleado'}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box className="empleado-form-content">
            <Controller
              name="nombre"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Nombre"
                  error={errors.nombre?.message?.toString() || null}
                  fullWidth
                />
              )}
            />

            <Controller
              name="fecha_ingreso"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="date"
                  label="Fecha de Ingreso"
                  error={errors.fecha_ingreso?.message?.toString() || null}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />

            <Controller
              name="salario"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  label="Salario"
                  error={errors.salario?.message?.toString() || null}
                  fullWidth
                />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="inherit">
            Cancelar
          </Button>
          <Button type="submit" variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EmpleadoForm;