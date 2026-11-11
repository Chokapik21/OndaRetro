import axios from 'axios';

// Toma la URL base limpia (http://127.0.0.1:7000)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:7000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// GET / -> Healthcheck
export const checkHealth = async () => {
  const response = await api.get('/');
  return response.data;
};

// GET /api/OndaRetro -> Consulta general
export const getOndaRetro = async () => {
  const response = await api.get('/api/OndaRetro');
  return response.data;
};

// GET /api/OndaRetro/{id} -> Consulta individual
export const getOndaRetroById = async (id) => {
  const response = await api.get(`/api/OndaRetro/${id}`);
  return response.data;
};

// POST /api/OndaRetro -> Registrar
export const createOndaRetro = async (data) => {
  const response = await api.post('/api/OndaRetro', data);
  return response.data;
};

// PUT /api/OndaRetro/{id} -> Modificar
export const updateOndaRetro = async (id, data) => {
  const response = await api.put(`/api/OndaRetro/${id}`, data);
  return response.data;
};

// DELETE /api/OndaRetro/{id} -> Eliminar
export const deleteOndaRetro = async (id) => {
  const response = await api.delete(`/api/OndaRetro/${id}`);
  return response.data;
};