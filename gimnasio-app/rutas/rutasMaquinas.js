//creamos un CRUD para maquinas usando express
const express = require('express');
const router = express.Router();
const ControladorMaquinas = require('../controladores/controladorMaquinas');
const authMiddleware = require('../utils/authMiddleware');
const authRole = require('../utils/authRole');
const { body } = require('express-validator');

const validarMaquina = [
  body('modelo').trim().notEmpty().withMessage('El modelo es obligatorio').escape(),
  body('marca').trim().notEmpty().withMessage('La marca es obligatoria').escape(),
  body('grupoMuscular').trim().notEmpty().withMessage('El grupo muscular es obligatorio').escape(),
  body('resistencia').trim().notEmpty().withMessage('La resistencia es obligatoria').escape(),
  body('precio').isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo')
];

router.get('/', ControladorMaquinas.getMaquinas);
router.get('/:id', ControladorMaquinas.getMaquina);
router.post('/', authMiddleware, authRole('admin'), validarMaquina, ControladorMaquinas.crearMaquina);
router.put('/:id', authMiddleware, authRole('admin'), validarMaquina, ControladorMaquinas.actualizarMaquina);
router.delete('/:id', authMiddleware, authRole('admin'), ControladorMaquinas.eliminarMaquina);
module.exports = router;