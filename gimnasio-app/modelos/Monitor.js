const mongoose = require('mongoose');

const monitorGimnasio = new mongoose.Schema({
  nombre: String,
  fechaNacimiento: String,
  salario: Number,
  turno: String,
  foto: String // URL o base64
});

module.exports = mongoose.model('Monitor', monitorGimnasio);