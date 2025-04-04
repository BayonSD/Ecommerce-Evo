const db = require('../db');

// Agregar al carrito
exports.agregarAlCarrito = (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    const { producto_id, cantidad } = req.body;
    const usuario_id = req.session.user.id;

    // Verificar si el producto ya está en el carrito
    const queryCheck = 'SELECT * FROM carrito WHERE usuario_id = ? AND producto_id = ?';
    db.query(queryCheck, [usuario_id, producto_id], (err, results) => {
        if (err) {
            console.error('Error al verificar el carrito:', err);
            return res.status(500).send('Error interno del servidor');
        }

        if (results.length > 0) {
            // Si el producto ya está en el carrito, actualizar la cantidad
            const queryUpdate = 'UPDATE carrito SET cantidad = cantidad + ? WHERE usuario_id = ? AND producto_id = ?';
            db.query(queryUpdate, [cantidad, usuario_id, producto_id], (err) => {
                if (err) {
                    console.error('Error al actualizar el carrito:', err);
                    return res.status(500).send('Error interno del servidor');
                }
                res.redirect('/carrito');
            });
        } else {
            // Si no está en el carrito, agregarlo
            const queryInsert = 'INSERT INTO carrito (usuario_id, producto_id, cantidad) VALUES (?, ?, ?)';
            db.query(queryInsert, [usuario_id, producto_id, cantidad], (err) => {
                if (err) {
                    console.error('Error al agregar al carrito:', err);
                    return res.status(500).send('Error interno del servidor');
                }
                res.redirect('/carrito');
            });
        }
    });
};

// Agregar a lista de deseos
exports.agregarAListaDeseos = (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    const { producto_id } = req.body;
    const usuario_id = req.session.user.id;

    // Verificar si el producto ya está en la lista de deseos
    const queryCheck = 'SELECT * FROM lista_deseos WHERE usuario_id = ? AND producto_id = ?';
    db.query(queryCheck, [usuario_id, producto_id], (err, results) => {
        if (err) {
            console.error('Error al verificar la lista de deseos:', err);
            return res.status(500).send('Error interno del servidor');
        }

        if (results.length > 0) {
            // Si ya está en la lista de deseos, no hacer nada
            return res.redirect('/lista-deseos');
        } else {
            // Si no está en la lista de deseos, agregarlo
            const queryInsert = 'INSERT INTO lista_deseos (usuario_id, producto_id) VALUES (?, ?)';
            db.query(queryInsert, [usuario_id, producto_id], (err) => {
                if (err) {
                    console.error('Error al agregar a lista de deseos:', err);
                    return res.status(500).send('Error interno del servidor');
                }
                res.redirect('/lista-deseos');
            });
        }
    });
};

// Confirmar compra del carrito
exports.confirmarCompra = (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    const usuario_id = req.session.user.id;

    // Obtener los productos en el carrito del usuario
    const queryCarrito = 'SELECT p.id, p.precio, c.cantidad FROM carrito c INNER JOIN productos p ON c.producto_id = p.id WHERE c.usuario_id = ?';
    db.query(queryCarrito, [usuario_id], (err, results) => {
        if (err) {
            console.error('Error al obtener el carrito:', err);
            return res.status(500).send('Error interno del servidor');
        }

        if (results.length === 0) {
            return res.redirect('/carrito');
        }

        // Calcular el total de la compra
        let total = 0;
        results.forEach(item => {
            total += item.precio * item.cantidad;
        });

        // Crear un nuevo pedido
        const queryPedido = 'INSERT INTO pedidos (usuario_id, total, estado) VALUES (?, ?, "Pendiente")';
        db.query(queryPedido, [usuario_id, total], (err, result) => {
            if (err) {
                console.error('Error al crear el pedido:', err);
                return res.status(500).send('Error interno del servidor');
            }

            const pedido_id = result.insertId;

            // Agregar los detalles del pedido
            const queryDetalles = 'INSERT INTO detalles_pedido (pedido_id, producto_id, cantidad, precio) VALUES (?, ?, ?, ?)';
            results.forEach(item => {
                db.query(queryDetalles, [pedido_id, item.id, item.cantidad, item.precio], (err) => {
                    if (err) {
                        console.error('Error al agregar detalles del pedido:', err);
                    }
                });
            });

            // Vaciar el carrito después de confirmar la compra
            const queryVaciarCarrito = 'DELETE FROM carrito WHERE usuario_id = ?';
            db.query(queryVaciarCarrito, [usuario_id], (err) => {
                if (err) {
                    console.error('Error al vaciar el carrito:', err);
                    return res.status(500).send('Error interno del servidor');
                }

                res.redirect('/pedidos');
            });
        });
    });
};
