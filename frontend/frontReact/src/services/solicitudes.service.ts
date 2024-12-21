import axios from 'axios';
import { API_BASE_URL } from '../config/constants';

export interface Solicitud {
  id: number;
  codigo: string;
  descripcion: string;
  resumen: string;
  id_empleado: number;
  empleado?: {
    id: number;
    nombre: string;
  };
}

export interface CreateSolicitudDto {
  codigo: string;
  descripcion: string;
  resumen: string;
  id_empleado: number;
}

const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/solicitudes`,
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

export const solicitudesService = {
  getAll: async (): Promise<Solicitud[]> => {
    try {
      const { data } = await apiClient.get('/');
      return data;
    } catch (error) {
      console.error('Error fetching solicitudes:', error);
      throw new Error('Error al obtener solicitudes');
    }
  },

  create: async (solicitud: CreateSolicitudDto): Promise<Solicitud> => {
    try {
      const { data } = await apiClient.post('/', solicitud);
      return data;
    } catch (error) {
      console.error('Error creating solicitud:', error);
      throw new Error('Error al crear la solicitud');
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      await apiClient.delete(`/${id}`);
    } catch (error) {
      console.error('Error deleting solicitud:', error);
      throw new Error('Error al eliminar la solicitud');
    }
  }
};