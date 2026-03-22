require('dotenv').config();
const express = require('express');
const connectDB = require('./src/data/database');
const authRoutes = require('./src/routes/authRoutes');

const app = express();

//DB connection
connectDB();

//Read JSON
app.use(express.json());

//Auth routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));