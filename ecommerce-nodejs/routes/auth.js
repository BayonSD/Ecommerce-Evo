const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authControllers');

// Ruta para el login (GET muestra el formulario, POST procesa el login)
router.get('/login', authControllers.getLoginPage);
router.post('/login', authControllers.loginUser);

// Ruta para el registro (GET muestra el formulario, POST procesa el registro)
router.get('/register', authControllers.getRegisterPage);
router.post('/register', authControllers.registerUser);

module.exports = router;
