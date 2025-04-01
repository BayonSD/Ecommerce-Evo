const db = require("../db");  // Conexión a la base de datos

// Obtener todos los productos
exports.obtenerProductos = (req, res) => {
  const query = 'SELECT * FROM productos';
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).send("Error al obtener los productos.");
    }
    res.render("productos", { productos: result });  // Renderiza la vista 'productos.ejs' con los productos
  });
};

// Obtener un producto específico por ID
exports.obtenerProductoPorId = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM productos WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).send("Error al obtener el producto.");
    }
    if (result.length === 0) {
      return res.status(404).send("Producto no encontrado.");
    }
    res.render("producto", { producto: result[0] });  // Renderiza la vista 'producto.ejs' con el producto específico
  });
};
