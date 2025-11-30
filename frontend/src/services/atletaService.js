import axios from 'axios';

const API_URL = '/api/atletas';

const getAtletas = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getAtletaById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

const createAtleta = async (atletaData) => {
  const response = await axios.post(API_URL, atletaData);
  return response.data;
};

const updateAtleta = async (id, atletaData) => {
  const response = await axios.put(`${API_URL}/${id}`, atletaData);
  return response.data;
};

const deleteAtleta = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

const atletaService = {
  getAtletas,
  getAtletaById,
  createAtleta,
  updateAtleta,
  deleteAtleta,
};

export default atletaService;