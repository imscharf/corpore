import axios from 'axios';

const API_URL = '/api/fisioterapeutas';

const getFisioterapeutas = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getFisioterapeutaById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

const createFisioterapeuta = async (fisioterapeutaData) => {
  const response = await axios.post(API_URL, fisioterapeutaData);
  return response.data;
};

const updateFisioterapeuta = async (id, fisioterapeutaData) => {
  const response = await axios.put(`${API_URL}/${id}`, fisioterapeutaData);
  return response.data;
};

const deleteFisioterapeuta = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

const fisioterapeutaService = {
  getFisioterapeutas,
  getFisioterapeutaById,
  createFisioterapeuta,
  updateFisioterapeuta,
  deleteFisioterapeuta,
};

export default fisioterapeutaService;