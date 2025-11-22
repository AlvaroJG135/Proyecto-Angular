const mongoose = require('mongoose');

const monitorGimnasio = new mongoose.Schema({
  id: { type: Number, required: true },
  nombre: String,
  fechaNacimiento: String,
  salario: Number, 
  turno: String
});

module.exports = mongoose.model('Monitor', monitorGimnasio);