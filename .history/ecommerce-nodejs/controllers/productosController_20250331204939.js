const db = require('../db'); // Asegúrate de que la conexión a la base de datos es correcta

// Controlador para obtener todos los productos
exports.obtenerProductos = (req, res) => {
    db.query('SELECT * FROM productos', (err, results) => {
        if (err) {
            console.error('Error obteniendo productos:', err);
            return res.status(500).send('Error en el servidor');
        }

        // Pasamos la variable 'productos' a la vista
        res.render('producto', { productos: results });
    });
};
