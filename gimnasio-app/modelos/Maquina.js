const mongoose = require('mongoose');

const maquinaGimnasio = new mongoose.Schema({
  numSerie: String,
  modelo: String,
  marca: String,
  grupoMuscular: String, 
  resistencia: String,
  precio: Number
});

module.exports = mongoose.model('Maquina', maquinaGimnasio);