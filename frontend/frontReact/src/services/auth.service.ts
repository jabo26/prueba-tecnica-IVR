import axios from 'axios';
import { API_BASE_URL } from '../config/constants';

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
}

const API_URL = `${API_BASE_URL}/auth`;

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      console.log('Sending login request:', credentials);
      console.log('To URL:', `${API_URL}/login`);
      const { data } = await axios.post(`${API_URL}/login`, credentials);
      console.log('Login response:', data);
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error; 
    }
  }
};