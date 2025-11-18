const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const rutasMonitores = require('./rutas/rutasMonitores');
const rutasMaquinas = require('./rutas/rutasMaquinas');

// Permite recibir JSON en peticiones POST
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
  credentials: true,
}))

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/2daw')
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar MongoDB', err));

app.use('/monitores', rutasMonitores);
app.use('/maquinas', rutasMaquinas);

app.use((req, res) => {
  res.status(404).send('Ruta no encontrada');
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));