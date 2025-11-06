const mongoose = require('mongoose');

const monitorGimnasio = new mongoose.Schema({
  id: { type: Number, required: true },
  nombre: String,
  fechaNacimiento: Date,
  salario: Number, 
  Turno: String
});

module.exports = mongoose.model('Monitor', monitorGimnasio);