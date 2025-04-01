const db = require("../db"); // Asegúrate de que esta ruta sea correcta

// Función para obtener todos los productos
exports.obtenerProductos = (req, res) => {
  const query = 'SELECT * FROM productos';  // Ajusta según tu tabla de productos
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error al obtener los productos: ", err);
      return res.status(500).send("Error al obtener los productos.");
    }
    console.log(result);  // Verifica que se están obteniendo los productos
    // Renderizar la vista 'producto.ejs' y pasar los resultados
    res.render('producto', { productos: result });
  });
};
