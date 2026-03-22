require('dotenv').config();
const express = require('express');
const connectDB = require('./src/data/database');
const authRoutes = require('./src/routes/authRoutes');

const app = express();

// Conexão com o banco
connectDB();

//Leitura de JSON
app.use(express.json());

//Rotas de autenticação
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));