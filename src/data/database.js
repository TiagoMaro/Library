const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Tenta conectar
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Erro ao conectar ao MongoDB: ${error.message}`);
    // Encerra a aplicação se a conexão falhar
    process.exit(1);
  }
};

module.exports = connectDB;