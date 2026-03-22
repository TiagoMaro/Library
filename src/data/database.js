const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    //Try connection
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Erro ao conectar ao MongoDB: ${error.message}`);
    //End process if failed
    process.exit(1);
  }
};

module.exports = connectDB;