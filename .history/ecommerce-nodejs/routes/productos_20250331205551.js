const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

// Ruta para obtener todos los productos
router.get('/', productosController.obtenerProductos);

// Ruta para obtener un producto por ID (detalle)
router.get('/detalle/:id', productosController.obtenerProductoPorId);  // Esta es la ruta que debe coincidir

module.exports = router;
