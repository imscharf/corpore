import axios from 'axios';

const API_URL = 'http://localhost:5000/api/anamneses';

const getAnamneses = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getAnamneseById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

const createAnamnese = async (anamneseData) => {
  const response = await axios.post(API_URL, anamneseData);
  return response.data;
};

const updateAnamnese = async (id, anamneseData) => {
  const response = await axios.put(`${API_URL}/${id}`, anamneseData);
  return response.data;
};

const deleteAnamnese = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

const anamneseService = {
  getAnamneses,
  getAnamneseById,
  createAnamnese,
  updateAnamnese,
  deleteAnamnese,
};

export default anamneseService;