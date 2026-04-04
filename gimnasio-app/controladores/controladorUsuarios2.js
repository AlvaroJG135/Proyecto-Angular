const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger.js')
const Usuario = require('../modelos/Usuario');
const { validationResult } = require('express-validator');

// Clave secreta para JWT (en producción usar variable de entorno)
const SECRET_KEY = 'clave_super_secreta'; // process.env.SECRET_KEY

// Registro de usuario
const usuarioRegistro = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(401).json({ errores: errores.array() });
  }

  const userIP = req.ip;
  const method = req.method;
  const url = req.originalUrl;

  try {
    const { codigo, email, clave, nombre } = req.body;

    // Verificar si ya existe
    const existingUser = await Usuario.findOne({ codigo });
    if (existingUser){
      logger.info(`${userIP} - - "${method} ${url}" REGISTRO: Intento de registrar usuario existente ${existingUser.id} `)
      return res.status(401).json({ message: 'El usuario ya existe' });
    }
    // Cifrar contraseña
    const hashedPassword = await bcrypt.hash(clave, 10);

    // Crear usuario
    const userData = { codigo, email, nombre, clave: hashedPassword };
    if (req.body.rol) {
      userData.rol = req.body.rol;
    }
    const user = new Usuario(userData);
    await user.save();
    logger.info(`${userIP} - - "${method} ${url}" REGISTRO: Usuario registrado`)
    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    logger.error(`${userIP} - - "${method} ${url}" REGISTRO: error ${error}}`)
    res.status(500).json({ message: 'Error en el registro', error });
  }
};

// Login
const usuarioLogin = async (req, res) => {
  const userIP = req.ip;
  const method = req.method;
  const url = req.originalUrl;
  try {
    const { codigo, clave } = req.body;

    // Buscar usuario
    const user = await Usuario.findOne({ codigo });
    if (!user) {
      logger.info(`${userIP} - - "${method} ${url}" LOGIN: usuario ${codigo} no encontrado`);
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    // Verificar contraseña
    const isMatch = await bcrypt.compare(clave, user.clave);
    if (!isMatch) {
      logger.info(`${userIP} - - "${method} ${url}" LOGIN: usuario/clave incorrecta de ${user.id} `);
      return res.status(401).json({ message: 'Usuario/clave incorrecta' });
    }
    // Crear token JWT incluyendo rol para verificación de admin
    const token = jwt.sign({ id: user._id, email: user.email, rol: user.rol }, SECRET_KEY, { expiresIn: '1h' });
    logger.info(`${userIP} - - "${method} ${url}" LOGIN: login correcto de ${user.id} `);

    // Guardar token en cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // cambiar a true si usas HTTPS
      sameSite: 'strict',
      maxAge: 60 * 60 * 3000, // 1 hora
    });

    res.json({ message: 'Login correcto', rol: user.rol, codigo: user.codigo });
  } catch (error) {
    logger.error(`${userIP} - - "${method} ${url}" REGISTRO: error ${error}}`)
    res.status(500).json({ message: 'Error en el login', error });
  }
};

// Logout: el token se debe eliminar en el cliente, en el servidor es válido mientras no expire
const usuarioLogout = (req, res) => {
  const userIP = req.ip;
  const method = req.method;
  const url = req.originalUrl;
  res.clearCookie('token');
  logger.info(`${userIP} - - "${method} ${url}" LOGOUT: cierre de sesión `);
  res.json({ message: 'Logout correcto' });
};

//Ejemplo de ruta protegida
const getPerfil = async (req, res) => {
  const userIP = req.ip;
  const method = req.method;
  const url = req.originalUrl;
  try {
    const user = await Usuario.findById(req.usuarioId).select('-clave');
    logger.info(`${userIP} - - "${method} ${url}" PERFIL: petición realizada `);
    res.json({ message: 'Perfil del usuario', user: user });
  } catch (error) {
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select('-clave');
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
};

const getUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).select('-clave');
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuario', error });
  }
};

const actualizarUsuario = async (req, res) => {
  try {
    const datos = { ...req.body };
    if (datos.clave) {
      datos.clave = await bcrypt.hash(datos.clave, 10);
    }
    const updatedUser = await Usuario.findByIdAndUpdate(req.params.id, datos, { new: true }).select('-clave');
    if (!updatedUser) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar usuario', error });
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    const deletedUser = await Usuario.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(200).json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar usuario', error });
  }
};

module.exports = {
  usuarioLogin,
  usuarioLogout,
  usuarioRegistro,
  getPerfil,
  getUsuarios,
  getUsuario,
  actualizarUsuario,
  eliminarUsuario
};