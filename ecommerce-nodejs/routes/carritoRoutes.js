const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoController');

// Ruta para agregar al carrito
router.post('/agregar', carritoController.agregarAlCarrito);

// Ruta para agregar a la lista de deseos
router.post('/agregar-deseo', carritoController.agregarAListaDeseos);

// Ruta para confirmar la compra
router.post('/confirmar-compra', carritoController.confirmarCompra);

module.exports = router;
