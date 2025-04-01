const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

// Definir las rutas
router.get('/', productosController.obtenerProductos);  // Ruta para obtener todos los productos
router.get('/:id', productosController.obtenerProductoPorId);  // Ruta para obtener un producto por ID

module.exports = router;
