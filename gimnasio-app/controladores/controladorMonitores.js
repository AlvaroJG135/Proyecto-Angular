// Importa el modelo Monitor de MongoDB
const Monitor = require('../modelos/Monitor');

// Obtiene la lista completa de monitores de la base de datos
// Ruta: GET /monitores
async function getMonitores(req, res) {
  try {
    // Busca todos los monitores en la colección
    const monitores = await Monitor.find();
    // Retorna con estado 200 (OK) y los monitores en formato JSON
    res.status(200).json(monitores);
  } catch (err) {
    // Captura y registra el error en la consola
    console.error("Error en getMonitores:", err.message);
    // Retorna error 500 (Error interno del servidor)
    res.status(500).json({"error":"Error al obtener los monitores"});
  }
}

// Obtiene un monitor específico por su ID (_id)
// Ruta: GET /monitores/:id
async function getMonitor(req, res) {
  try {
    // Busca el monitor por su ID (parámetro de la URL)
    const monitor = await Monitor.findById(req.params.id);
    // Si no existe el monitor, retorna 404 (No encontrado)
    if (!monitor) return res.status(404).json({"status":"Error monitor no encontrado"});
    // Retorna con estado 200 y el monitor encontrado
    res.status(200).json(monitor);
  } catch (err) {
    // Captura y registra el error
    console.error("Error en getMonitor:", err.message);
    // Retorna error 500
    res.status(500).json({"status":"Error al obtener el monitor"});
  }
}

// Crea un nuevo monitor con los datos del body de la petición
// Ruta: POST /monitores
async function crearMonitor(req, res) {
  try {
    // Crea una nueva instancia del modelo Monitor con los datos del request
    const newMonitor = new Monitor(req.body);
    // Guarda el nuevo monitor en la base de datos
    await newMonitor.save();
    // Retorna con estado 201 (Creado) y el monitor creado
    res.status(201).json(newMonitor);
  } catch (err) {
    // Captura y registra el error
    console.error("Error en crearMonitor:", err.message);
    // Retorna error 400 (Solicitud inválida) si hay error de validación
    res.status(400).json({"status":"Error al crear el monitor"});
  }
}

// Actualiza un monitor existente con los datos del body
// Ruta: PUT /monitores/:id
async function actualizarMonitor(req, res) {
  try {
    // Busca el monitor por ID y actualiza sus datos
    // { new: true } devuelve el documento actualizado (no el anterior)
    const updatedMonitor = await Monitor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    // Si no existe el monitor, retorna 404
    if (!updatedMonitor) return res.status(404).json({"status":"Error monitor no encontrado"});
    // Retorna con estado 200 y el monitor actualizado
    res.status(200).json(updatedMonitor);
  } catch (err) {
    // Captura y registra el error
    console.error("Error en actualizarMonitor:", err.message);
    // Retorna error 400
    res.status(400).json({"status":"Error al actualizar el monitor"});
  }
}

// Elimina un monitor de la base de datos
// Ruta: DELETE /monitores/:id
async function eliminarMonitor(req, res) {
  try {
    // Busca el monitor por ID y lo elimina de la base de datos
    const deletedMonitor = await Monitor.findByIdAndDelete(req.params.id);
    // Si no existe el monitor, retorna 404
    if (!deletedMonitor) return res.status(404).json({"status":"Error monitor no encontrado"});
    // Retorna con estado 200 y un mensaje de éxito
    res.status(200).json({"status":"operación realizada"});
  } catch (err) {
    // Captura y registra el error
    console.error("Error en EliminarMonitor:", err.message);
    // Retorna error 500
    res.status(500).json({"status":"Error al eliminar el monitor"});
  }
}

// Exporta todas las funciones del controlador para ser usadas en las rutas
module.exports = { getMonitores, getMonitor, crearMonitor, actualizarMonitor, eliminarMonitor };