const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authControllers');  // Asegúrate de que el nombre del archivo sea correcto

// Ruta para mostrar la página de login (GET)
router.get('/', authControllers.showLoginPage);  // Ruta para cargar la página de login

// Ruta para manejar el login de usuarios (POST)
router.post('/', authControllers.loginUser);  // Ruta para hacer el login con POST

// Ruta para manejar el registro de usuarios (POST)
router.post('/register', authControllers.registerUser);  // Ruta para hacer el registro con POST

module.exports = router;
