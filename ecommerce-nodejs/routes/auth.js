// routes/auth.js

const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authControllers');

// Ruta para mostrar la página de login (GET)
router.get('/', authControllers.showLoginPage);

// Ruta para manejar el login de usuarios (POST)
router.post('/login', authControllers.loginUser);

// Ruta para mostrar la página de registro (GET)
router.get('/register', authControllers.showRegisterPage);

// Ruta para manejar el registro de usuarios (POST)
router.post('/register', authControllers.registerUser);

module.exports = router;
