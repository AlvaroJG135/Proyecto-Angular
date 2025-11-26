// express: framework web para Node.js
const express = require('express');
// mongoose: ODM (Object Data Modeling) para MongoDB
const mongoose = require('mongoose');
// cors: permite peticiones desde otros dominios (ej: localhost:4200)
const cors = require('cors');

// Inicializa la aplicación Express
const app = express();

// Importa las rutas de cada recurso
const rutasMonitores = require('./rutas/rutasMonitores');
const rutasMaquinas = require('./rutas/rutasMaquinas');
const rutasUsuarios = require('./rutas/rutasUsuarios');


app.use(express.json());

// Configuración CORS (Cross-Origin Resource Sharing)
// Permite que el frontend en localhost:4200 haga peticiones a este backend
app.use(cors({
  origin: 'http://localhost:4200', // Origen permitido
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'], // Métodos HTTP permitidos
  credentials: true, // Permite enviar cookies/credenciales
}))


// Conecta a MongoDB usando Mongoose
// URL: mongodb://usuario:contraseña@host:puerto/baseDatos?authSource=admin
mongoose.connect('mongodb://root:example@localhost:27017/2daw?authSource=admin')
  .then(() => console.log('Conectado a MongoDB')) // Éxito: muestra mensaje
  .catch(err => console.error('Error al conectar MongoDB', err)); // Error: muestra el error


// Rutas para gestionar monitores (CRUD)
app.use('/monitores', rutasMonitores);
// Rutas para gestionar máquinas (CRUD)
app.use('/maquinas', rutasMaquinas);
// Rutas para gestionar usuarios (login, registro, logout)
app.use('/usuarios', rutasUsuarios);


// Middleware que captura cualquier ruta no definida
app.use((req, res) => {
  res.status(404).send('Ruta no encontrada');
});


// Puerto donde escucha el servidor
const PORT = 4000;
// Inicia el servidor y muestra un mensaje con la URL
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));