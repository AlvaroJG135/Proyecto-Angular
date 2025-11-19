const mongoose = require('mongoose');

const monitorGimnasio = new mongoose.Schema({
  id: { type: Number, required: true },
  nombre: {type: String},
  fechaNacimiento:{type: String} ,
  salario: {type:Number}, 
  Turno: {type:String}
});

module.exports = mongoose.model('Monitor', monitorGimnasio);