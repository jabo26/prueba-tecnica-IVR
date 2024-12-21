import axios from 'axios';
import { API_BASE_URL } from '../config/constants';

export interface Empleado {
  id: number;
  nombre: string;
  fecha_ingreso: string;
  salario: number;
}

export interface CreateEmpleadoDto {
  nombre: string;
  fecha_ingreso: string;
  salario: number;
}

const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/empleados`,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const empleadosService = {
  getAll: async (): Promise<Empleado[]> => {
    try {
      console.log('Fetching empleados...');
      console.log('Token:', localStorage.getItem('token')); 
      const { data } = await apiClient.get('/');
      console.log('Empleados fetched:', data);
      return data;
    } catch (error) {
      const err = error as any;
      console.error('Error detallado:', err.response?.data || err.message);
      throw error;
    }
  },

  // Crear un nuevo empleado
  create: async (empleado: CreateEmpleadoDto): Promise<Empleado> => {
    try {
      const { data } = await apiClient.post('/', empleado);
      return data;
    } catch (error) {
      console.error('Error creating empleado:', error);
      throw new Error('Error al crear el empleado');
    }
  }
};