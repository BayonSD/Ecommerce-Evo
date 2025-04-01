const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authControllers');  // Asegúrate de que el nombre del archivo sea correcto

// Ruta para mostrar la página de login
router.get('/', authControllers.showLoginPage);

// Ruta para manejar el login de usuarios
router.post('/login', authControllers.loginUser);

// Ruta para manejar el registro de usuarios
router.post('/register', authControllers.registerUser);

module.exports = router;
