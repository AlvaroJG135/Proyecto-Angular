//creamos un CRUD para monitores usando express
const express = require('express');
const router = express.Router();
const ControladorMonitores = require('../controladores/controladorMonitores');

router.get('/', ControladorMonitores.getMonitores);
router.get('/:id', ControladorMonitores.getMonitor);
router.post('/', ControladorMonitores.crearMonitor);
router.put('/:id', ControladorMonitores.actualizarMonitor);
router.delete('/:id', ControladorMonitores.eliminarMonitor);
module.exports = router;