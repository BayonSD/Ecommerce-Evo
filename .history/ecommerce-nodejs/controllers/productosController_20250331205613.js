const db = require('../db'); // Asegúrate de que la conexión a la base de datos esté correcta

// VER PRODUCTOS
exports.obtenerProductos = (req, res) => {
    db.query('SELECT * FROM productos', (err, results) => {
        if (err) {
            console.error('Error obteniendo productos:', err);
            return res.status(500).send('Error en el servidor');
        }

        // Verificar que results no está vacío
        if (results.length > 0) {
            // Pasa los productos a la vista
            res.render('producto', { productos: results });
        } else {
            // Si no hay productos, pasa una lista vacía
            res.render('producto', { productos: [] });
        }
    });
};

// Controlador para obtener un solo producto por ID
exports.obtenerProductoPorId = (req, res) => {
  const productoId = req.params.id;

  db.query('SELECT * FROM productos WHERE id = ?', [productoId], (err, results) => {
      if (err) {
          console.error('Error obteniendo producto:', err);
          return res.status(500).send('Error en el servidor');
      }

      if (results.length > 0) {
          // Pasa el producto a la vista del detalle
          res.render('detalleProducto', { producto: results[0] });
      } else {
          res.status(404).send('Producto no encontrado');
      }
  });
};
