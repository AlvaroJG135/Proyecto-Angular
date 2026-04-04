const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  codigo: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  clave: { type: String, required: true },
  nombre: { type: String, required: true },
  rol: { type: String, enum: ['usuario', 'admin'], default: 'usuario' },
  estado: { type: String, default: 'Activo' },
  fechaUltimoAcceso: { type: Date, default: Date.now },
  numeroAccesosErroneo: { type: Number, default: 0 }
});

module.exports = mongoose.model('Usuario', usuarioSchema);