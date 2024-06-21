const mongoose = require('mongoose');
require('dotenv').config();

async function mongoConnect() {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@prueba.bqc6bwy.mongodb.net/pharmaControl?retryWrites=true&w=majority&appName=prueba`);
        console.log('Conexión exitosa a la base de datos MongoDB');
    } catch (error) {
        console.error('Error al conectar a la base de datos MongoDB:', error.message);
        process.exit(1);
    }
}

module.exports = { mongoConnect };
