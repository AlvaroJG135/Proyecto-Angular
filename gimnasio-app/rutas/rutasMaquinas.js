//creamos un CRUD para maquinas usando express
const express = require('express');
const router = express.Router();
const ControladorMaquinas = require('../controladores/controladorMaquinas');

router.get('/', ControladorMaquinas.getMaquinas);
router.get('/:id', ControladorMaquinas.getMaquina);
router.post('/', ControladorMaquinas.crearMaquina);
router.put('/:id', ControladorMaquinas.actualizarMaquina);
router.delete('/:id', ControladorMaquinas.eliminarMaquina);
module.exports = router;