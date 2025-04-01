// login/auth.js
const express = require('express');
const router = express.Router();
const authController = require('./authController'); // Asegúrate de que la ruta es correcta

// Rutas para manejar el login
router.get('/', authController.showLoginPage);  // Página de login
router.post('/', authController.handleLogin);   // Procesar login
router.get('/logout', authController.logout);   // Cerrar sesión

module.exports = router;
