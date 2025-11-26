// Importa el modelo Maquina de MongoDB
const Maquina = require('../modelos/Maquina');


// Obtiene la lista completa de máquinas de la base de datos
// Ruta: GET /maquinas
async function getMaquinas(req, res) {
  try {
    // Busca todas las máquinas en la colección
    const maquinas = await Maquina.find();
    // Retorna con estado 200 (OK) y las máquinas en formato JSON
    res.status(200).json(maquinas);
  } catch (err) {
    // Captura y registra el error en la consola
    console.error("Error en getMaquinas:", err.message);
    // Retorna error 500 (Error interno del servidor)
    res.status(500).json({"error":"Error al obtener las maquinas"});
  }
}

// Obtiene una máquina específica por su ID (_id)
// Ruta: GET /maquinas/:id
async function getMaquina(req, res) {
  try {
    // Busca la máquina por su ID (parámetro de la URL)
    const maquina = await Maquina.findById(req.params.id);
    // Si no existe la máquina, retorna 404 (No encontrado)
    if (!maquina) return res.status(404).json({"status":"Error maquina no encontrada"});
    // Retorna con estado 200 y la máquina encontrada
    res.status(200).json(maquina);
  } catch (err) {
    // Captura y registra el error
    console.error("Error en getMaquinas:", err.message);
    // Retorna error 500
    res.status(500).json({"status":"Error al obtener la maquina"});
  }
}

// Crea una nueva máquina con los datos del body de la petición
// Ruta: POST /maquinas
async function crearMaquina(req, res) {
  try {
    // Crea una nueva instancia del modelo Maquina con los datos del request
    const newMaquina = new Maquina(req.body);
    // Guarda la nueva máquina en la base de datos
    await newMaquina.save();
    // Retorna con estado 201 (Creado) y la máquina creada
    res.status(201).json(newMaquina);
  } catch (err) {
    // Captura y registra el error
    console.error("Error en crearMaquina:", err.message);
    // Retorna error 400 (Solicitud inválida) si hay error de validación
    res.status(400).json({"status":"Error al crear la maquina"});
  }
}

// Actualiza una máquina existente con los datos del body
// Ruta: PUT /maquinas/:id
async function actualizarMaquina(req, res) {
  try {
    // Busca la máquina por ID y actualiza sus datos
    // { new: true } devuelve el documento actualizado (no el anterior)
    const updatedMaquina = await Maquina.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    // Si no existe la máquina, retorna 404
    if (!updatedMaquina) return res.status(404).json({"status":"Error maquina no encontrada"});
    // Retorna con estado 200 y la máquina actualizada
    res.status(200).json(updatedMaquina);
  } catch (err) {
    // Captura y registra el error
    console.error("Error en actualizarMaquina:", err.message);
    // Retorna error 400
    res.status(400).json({"status":"Error al actualizar la maquina"});
  }
}

// Elimina una máquina de la base de datos
// Ruta: DELETE /maquinas/:id
async function eliminarMaquina(req, res) {
  try {
    // Busca la máquina por ID y la elimina de la base de datos
    const deletedMaquina = await Maquina.findByIdAndDelete(req.params.id);
    // Si no existe la máquina, retorna 404
    if (!deletedMaquina) return res.status(404).json({"status":"Error maquina no encontrada"});
    // Retorna con estado 200 y un mensaje de éxito
    res.status(200).json({"status":"operación realizada"});
  } catch (err) {
    // Captura y registra el error
    console.error("Error en EliminarMaquina:", err.message);
    // Retorna error 500
    res.status(500).json({"status":"Error al eliminar la maquina"});
  }
}

// Exporta todas las funciones del controlador para ser usadas en las rutas
module.exports = { getMaquinas, getMaquina, crearMaquina, actualizarMaquina, eliminarMaquina };