const db = require("../db"); // Asegúrate de que esta ruta sea correcta

// Función para obtener todos los productos
exports.obtenerProductos = (req, res) => {
  const query = 'SELECT * FROM productos';  // Ajusta según tu tabla de productos
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error al obtener los productos: ", err);
      return res.status(500).send("Error al obtener los productos.");
    }
    // Renderizar la vista de productos y pasar los resultados
    res.render('productos', { productos: result });
  });
};

// Función para obtener un producto por su ID
exports.obtenerProductoPorId = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM productos WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error al obtener el producto: ", err);
      return res.status(500).send("Error al obtener el producto.");
    }
    if (result.length === 0) {
      return res.status(404).send("Producto no encontrado.");
    }
    res.render('productoDetalle', { producto: result[0] });
  });
};
