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
app.use('/api/agendamentos', agendamentoRoutes);

// Rota raiz para teste
app.get('/', (req, res) => {
  res.send('API is running...');
});

// CONFIGURAÇÃO PARA O VERCEL
const PORT = process.env.PORT || 5000;

// Só inicia o servidor se NÃO estivermos no ambiente do Vercel (para rodar localmente)
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Exporta o app para o Vercel tratar como Serverless Function
module.exports = app;