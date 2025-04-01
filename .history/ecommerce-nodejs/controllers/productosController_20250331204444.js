const db = require('../db');  // Asegúrate de que tienes la conexión a la base de datos correcta

// Controlador para obtener todos los productos
exports.obtenerProductos = (req, res) => {
    // Consulta SQL para obtener los productos de la base de datos
    db.query('SELECT * FROM productos', (err, results) => {
        if (err) {
            console.error('Error obteniendo productos:', err);
            return res.status(500).send('Error en el servidor');
        }

        // Pasar la lista de productos a la vista 'producto.ejs'
        res.render('producto', { productos: results });
    });
};
