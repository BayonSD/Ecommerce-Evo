const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');  // Importa el controlador

// Ruta para mostrar la página de login
router.get('/', authController.showLoginPage);

// Ruta para manejar el login de usuarios
router.post('/login', authController.loginUser);

// Ruta para manejar el registro de usuarios
router.post('/register', authController.registerUser);

module.exports = router;
