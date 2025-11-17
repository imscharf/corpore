require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Importar rotas
const atletaRoutes = require('./routes/atletaRoutes');
const fisioterapeutaRoutes = require('./routes/fisioterapeutaRoutes');
const diagnosticoRoutes = require('./routes/diagnosticoRoutes');
const anamneseRoutes = require('./routes/anamneseRoutes');
const exameRoutes = require('./routes/exameRoutes');
const agendamentoRoutes = require('./routes/agendamentoRoutes'); // Nova rota

// Conectar ao Banco de Dados
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Para parsear JSON no corpo das requisições

// Rotas da API
app.use('/api/atletas', atletaRoutes);
app.use('/api/fisioterapeutas', fisioterapeutaRoutes);
app.use('/api/diagnosticos', diagnosticoRoutes);
app.use('/api/anamneses', anamneseRoutes);
app.use('/api/exames', exameRoutes);
app.use('/api/agendamentos', agendamentoRoutes); // Usar a nova rota


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));