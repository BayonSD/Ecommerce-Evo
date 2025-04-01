// login/auth.js
const express = require('express');
const router = express.Router();
const authController = require('./authController');  // Esto debería ser correcto si authController.js está en la misma carpeta

// Rutas para manejar el login
router.get('/login', authController.showLoginPage);  // Página de login
router.post('/', authController.handleLogin);   // Procesar login
router.get('/logout', authController.logout);   // Cerrar sesión

module.exports = router;
