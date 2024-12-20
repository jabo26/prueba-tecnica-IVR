export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:9000';

export const API_ENDPOINTS = {
  AUTH: '/auth',
  EMPLEADOS: '/empleados',
  SOLICITUDES: '/solicitudes'
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};