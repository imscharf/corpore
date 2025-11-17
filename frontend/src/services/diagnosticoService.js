import axios from 'axios';

const API_URL = 'http://localhost:5000/api/diagnosticos';

const getDiagnosticos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getDiagnosticoById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

const createDiagnostico = async (diagnosticoData) => {
  const response = await axios.post(API_URL, diagnosticoData);
  return response.data;
};

const updateDiagnostico = async (id, diagnosticoData) => {
  const response = await axios.put(`${API_URL}/${id}`, diagnosticoData);
  return response.data;
};

const deleteDiagnostico = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

const diagnosticoService = {
  getDiagnosticos,
  getDiagnosticoById,
  createDiagnostico,
  updateDiagnostico,
  deleteDiagnostico,
};

export default diagnosticoService;