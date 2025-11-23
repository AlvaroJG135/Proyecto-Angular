const Monitor = require('../modelos/Monitor');

async function getMonitores(req, res) {
  try {
    const monitores = await Monitor.find();
    res.status(200).json(monitores);
  } catch (err) {
    console.error("Error en getMonitores:", err.message);

    res.status(500).json({"error":"Error al obtener los monitores"});
  }
}

async function getMonitor(req, res) {
  try {
    const monitor = await Monitor.findById(req.params.id);
    if (!monitor) return res.status(404) .json({"status":"Error monitor no encontrado"});
    res.status(200).json(monitor);
  } catch (err) {
    console.error("Error en getMonitor:", err.message);
    res.status(500).json({"status":"Error al obtener el monitor"});

  }
}

async function crearMonitor(req, res) {
  try {
    const newMonitor = new Monitor(req.body);
    await newMonitor.save();
    res.status(201).json(newMonitor);
  } catch (err) {
    console.error("Error en crearMonitor:", err.message);
    res.status(400).json({"status":"Error al crear el monitor"});
  }
}

async function actualizarMonitor(req, res) {
  try {
    const updatedMonitor = await Monitor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Para devolver el monitor actualizado
    );
    if (!updatedMonitor) return res.status(404).json({"status":"Error monitor no encontrado"});
    res.status(200).json(updatedMonitor);
  } catch (err) {
    console.error("Error en actualizarMonitor:", err.message);
    res.status(400).json({"status":"Error al actualizar el monitor"});
  }
}

async function eliminarMonitor(req, res) {
  try {
    const deletedMonitor = await Monitor.findByIdAndDelete(req.params.id);
    if (!deletedMonitor) return res.status(404).json({"status":"Error monitor no encontrado"});
    res.status(200).json({"status":"operación realizada"});
  } catch (err) {
    console.error("Error en actualizarMonitor:", err.message);
    res.status(500).json({"status":"Error al eliminar el monitor"});
  }
}

module.exports = { getMonitores, getMonitor, crearMonitor, actualizarMonitor, eliminarMonitor };