const mongoose = require('mongoose');

const monitorGimnasio = new mongoose.Schema({
  nombre: String,
  fechaNacimiento: String,
  salario: Number, 
  turno: String
});

module.exports = mongoose.model('Monitor', monitorGimnasio);