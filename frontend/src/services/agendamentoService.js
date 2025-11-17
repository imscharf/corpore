import axios from 'axios';

const API_URL = 'http://localhost:5000/api/agendamentos';

const getAgendamentos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getAgendamentoById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

const createAgendamento = async (agendamentoData) => {
  const response = await axios.post(API_URL, agendamentoData);
  return response.data;
};

const updateAgendamento = async (id, agendamentoData) => {
  const response = await axios.put(`${API_URL}/${id}`, agendamentoData);
  return response.data;
};

const deleteAgendamento = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

const agendamentoService = {
  getAgendamentos,
  getAgendamentoById,
  createAgendamento,
  updateAgendamento,
  deleteAgendamento,
};

export default agendamentoService;