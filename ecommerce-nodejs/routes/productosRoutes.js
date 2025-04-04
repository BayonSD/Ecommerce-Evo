const express = require('express');
const router = express.Router();
const productosControllers = require('../controllers/productosControllers');

// Ruta para mostrar los detalles de un producto
router.get('/productos/:id', productosControllers.getProductoDetalle);

module.exports = router;
