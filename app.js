require('dotenv').config();
const express = require('express');
const connectDB = require('./src/data/database');
const authRoutes = require('./src/routes/authRoutes');
const bookRoutes = require('./src/routes/bookRoutes');

const app = express();

//DB connection
connectDB();

//Read JSON
app.use(express.json());

//Auth routes /api/auth
app.use('/api/auth', authRoutes);

//Book routes /api/books
app.use('/api/books', bookRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));