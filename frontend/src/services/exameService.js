import axios from 'axios';

const API_URL = '/api/exames';

const getExames = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getExameById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

const createExame = async (exameData) => {
  const response = await axios.post(API_URL, exameData);
  return response.data;
};

const updateExame = async (id, exameData) => {
  const response = await axios.put(`${API_URL}/${id}`, exameData);
  return response.data;
};

const deleteExame = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

const exameService = {
  getExames,
  getExameById,
  createExame,
  updateExame,
  deleteExame,
};

export default exameService;