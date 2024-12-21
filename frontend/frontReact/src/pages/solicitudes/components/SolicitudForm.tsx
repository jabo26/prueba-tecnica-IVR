import React, { useEffect, useState } from 'react';
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
import { empleadosService } from '../../../services/empleados.service';
import Select from '../../../components/ui/Select/Select';
//import './SolicitudForm.css';
import { CreateSolicitudDto } from '../../../services/solicitudes.service';

const schema = yup.object().shape({
    codigo: yup.string().required('El código es requerido'),
    descripcion: yup.string().required('La descripción es requerida'),
    resumen: yup.string().required('El resumen es requerido'),
    id_empleado: yup.number().required('El empleado es requerido')
});

interface SolicitudFormProps {
    open: boolean;
    onClose: () => void;
    onSave: (data: CreateSolicitudDto) => void;
}

const SolicitudForm: React.FC<SolicitudFormProps> = ({
    open,
    onClose,
    onSave
}) => {
    interface Empleado {
        id: number;
        nombre: string;
    }

    const [empleados, setEmpleados] = useState<Empleado[]>([]);
    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            codigo: '',
            descripcion: '',
            resumen: '',
            id_empleado: 0
        }
    });

    useEffect(() => {
        fetchEmpleados();
    }, []);

    const fetchEmpleados = async () => {
        try {
            const data = await empleadosService.getAll();
            setEmpleados(data);
        } catch (error) {
            console.error('Error fetching empleados:', error);
        }
    };

    const onSubmit = (data: any) => {
        onSave(data);
        reset();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Nueva Solicitud</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <Box className="solicitud-form-content">
                        <Controller
                            name="codigo"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    label="Código"
                                    error={errors.codigo?.message?.toString()}
                                    fullWidth
                                />
                            )}
                        />

                        <Controller
                            name="descripcion"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    label="Descripción"
                                    error={errors.descripcion?.message?.toString()}
                                    fullWidth
                                />
                            )}
                        />

                        <Controller
                            name="resumen"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    label="Resumen"
                                    multiline
                                    rows={4}
                                    error={errors.resumen?.message?.toString()}
                                    fullWidth
                                />
                            )}
                        />

                        <Controller
                            name="id_empleado"
                            control={control}
                            defaultValue={0}  
                            render={({ field: { value, onChange, ...field } }) => (
                                <Select
                                    {...field}
                                    value={value || ''}  
                                    onChange={(e) => onChange(Number(e.target.value))}  
                                    label="Empleado"
                                    options={empleados.map(emp => ({
                                        value: emp.id,
                                        label: emp.nombre
                                    }))}
                                    error={errors.id_empleado?.message?.toString()}
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

export default SolicitudForm;