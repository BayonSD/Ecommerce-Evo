const db = require('../db');

// Obtener los detalles de un producto
exports.getProductoDetalle = (req, res) => {
  const productoId = req.params.id;  // Obtenemos el ID del producto desde la URL

  const query = 'SELECT * FROM productos WHERE id = ?';
  db.query(query, [productoId], (err, results) => {
    if (err) {
      console.error('Error al obtener el producto:', err);
      return res.status(500).send('Error interno del servidor');
    }

    if (results.length > 0) {
      // Si encontramos el producto, lo pasamos a la vista
      res.render('productoDetalle', { producto: results[0] });
    } else {
      // Si no se encuentra el producto, mostramos un error
      res.status(404).send('Producto no encontrado');
    }
  });
};
