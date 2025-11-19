const Maquina = require('../modelos/Maquina');

async function getMaquinas(req, res) {
  try {
    const maquinas = await Maquina.find();
    res.status(200).json(maquinas);
  } catch (err) {
    console.error("Error en getMaquinas:", err.message);

    res.status(500).json({"error":"Error al obtener las maquinas"});
  }
}

async function getMaquina(req, res) {
  try {
    const maquina = await Maquina.findById(req.params.id);
    if (!maquina) return res.status(404) .json({"status":"Error maquina no encontrada"});
    res.status(200).json(maquina);
  } catch (err) {
    console.error("Error en getMaquinas:", err.message);
    res.status(500).json({"status":"Error al obtener la maquina"});

  }
}

async function crearMaquina(req, res) {
  try {
    const newMaquina = new Maquina(req.body);
    await newMaquina.save();
    res.status(201).json(newMaquina);
  } catch (err) {
    console.error("Error en crearMaquina:", err.message);
    res.status(400).json({"status":"Error al crear la maquina"});

  }
}

async function actualizarMaquina(req, res) {
  try {
    const updatedMaquina = await Maquina.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Para devolver el maquina actualizado
    );
    if (!updatedMaquina) return res.status(404).json({"status":"Error maquina no encontrada"});
    res.status(200).json(updatedMaquina);
  } catch (err) {
    console.error("Error en actualizarMaquina:", err.message);
    res.status(400).json({"status":"Error al actualizar la maquina"});
  }
}

async function eliminarMaquina(req, res) {
  try {
    const deletedMaquina = await Maquina.findByIdAndDelete(req.params.id);
    if (!deletedMaquina) return res.status(404).json({"status":"Error maquina no encontrada"});
    res.status(200).json({"status":"operación realizada"});
  } catch (err) {
    console.error("Error en actualizarMaquina:", err.message);
    res.status(500).json({"status":"Error al eliminar la maquina"});
  }
}

module.exports = { getMaquinas, getMaquina, crearMaquina, actualizarMaquina, eliminarMaquina };