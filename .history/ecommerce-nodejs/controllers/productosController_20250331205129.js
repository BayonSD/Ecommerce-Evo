const db = require('../db'); // Asegúrate de que la conexión a la base de datos esté correcta

// Controlador para obtener todos los productos
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
