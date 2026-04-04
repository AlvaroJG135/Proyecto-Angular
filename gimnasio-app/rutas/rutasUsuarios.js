const express = require('express');
const router = express.Router();
const ControladorUsuarios = require('../controladores/controladorUsuarios2.js');
const authMiddleware= require('../utils/authMiddleware2.js');
const { validarRegistro, validarLogin } = require('../utils/validateUsuarios.js');

const authRole = require('../utils/authRole');

router.post('/registro', [validarRegistro, ControladorUsuarios.usuarioRegistro]);
router.post('/login', ControladorUsuarios.usuarioLogin);
router.post('/logout', ControladorUsuarios.usuarioLogout);
router.get('/perfil', authMiddleware, ControladorUsuarios.getPerfil);

// Rutas admin para CRUD de usuarios (solo administrador)
router.get('/', authMiddleware, authRole('admin'), ControladorUsuarios.getUsuarios);
router.get('/:id', authMiddleware, authRole('admin'), ControladorUsuarios.getUsuario);
router.put('/:id', authMiddleware, authRole('admin'), ControladorUsuarios.actualizarUsuario);
router.delete('/:id', authMiddleware, authRole('admin'), ControladorUsuarios.eliminarUsuario);

module.exports = router;