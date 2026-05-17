//creamos un CRUD para monitores usando express
const express = require('express');
const router = express.Router();
const ControladorMonitores = require('../controladores/controladorMonitores');
const authMiddleware = require('../utils/authMiddleware');
const authRole = require('../utils/authRole');
const { body } = require('express-validator');

const validarMonitor = [
  body('nombre').trim().notEmpty().withMessage('El nombre es obligatorio').escape(),
  body('fechaNacimiento').trim().notEmpty().withMessage('La fecha de nacimiento es obligatoria').escape(),
  body('salario').isFloat({ min: 0 }).withMessage('El salario debe ser un número positivo'),
  body('turno').trim().notEmpty().withMessage('El turno es obligatorio').escape()
];

router.get('/', ControladorMonitores.getMonitores);
router.get('/:id', ControladorMonitores.getMonitor);
router.post('/', authMiddleware, authRole('admin'), validarMonitor, ControladorMonitores.crearMonitor);
router.put('/:id', authMiddleware, authRole('admin'), validarMonitor, ControladorMonitores.actualizarMonitor);
router.delete('/:id', authMiddleware, authRole('admin'), ControladorMonitores.eliminarMonitor);
module.exports = router;