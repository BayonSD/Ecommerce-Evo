const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

// Ruta para obtener todos los productos
router.get('/', productosController.obtenerProductos);

module.exports = router;
