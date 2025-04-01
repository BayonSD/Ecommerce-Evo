const db = require('../db');  // Asegúrate de que la conexión a la base de datos es correcta

// Controlador para obtener todos los productos
exports.obtenerProductos = (req, res) => {
    // Consulta SQL para obtener los productos de la base de datos
    db.query('SELECT * FROM productos', (err, results) => {
        if (err) {
            console.error('Error obteniendo productos:', err);
            return res.status(500).send('Error en el servidor');
        }

        // Verifica que se recibieron productos y pasa la variable a la vista
        res.render('producto', { productos: results });
    });
};
