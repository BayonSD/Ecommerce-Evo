const db = require("../db");

// Obtener el carrito del usuario logueado
exports.getCarrito = (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }

    const usuario_id = req.session.user.id;
    const query = `
        SELECT c.id, p.nombre, p.precio, c.cantidad, p.imagen
        FROM carrito c
        JOIN productos p ON c.producto_id = p.id
        WHERE c.usuario_id = ?
    `;

    db.query(query, [usuario_id], (err, results) => {
        if (err) {
            console.error("Error al obtener el carrito:", err);
            return res.status(500).send("Error interno del servidor");
        }
        res.render("carrito", { carrito: results, usuario: req.session.user });
    });
};

// Agregar producto al carrito
exports.agregarAlCarrito = (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }

    const { producto_id, cantidad } = req.body;
    const usuario_id = req.session.user.id;

    const query = `
        INSERT INTO carrito (usuario_id, producto_id, cantidad) 
        VALUES (?, ?, ?) 
        ON DUPLICATE KEY UPDATE cantidad = cantidad + ?
    `;

    db.query(query, [usuario_id, producto_id, cantidad, cantidad], (err) => {
        if (err) {
            console.error("Error al agregar producto al carrito:", err);
            return res.status(500).send("Error interno del servidor");
        }
        res.redirect("/carrito");
    });
};

// Eliminar producto del carrito
exports.eliminarDelCarrito = (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }

    const { id } = req.params;
    const usuario_id = req.session.user.id;
    
    const query = "DELETE FROM carrito WHERE id = ? AND usuario_id = ?";
    db.query(query, [id, usuario_id], (err) => {
        if (err) {
            console.error("Error al eliminar producto del carrito:", err);
            return res.status(500).send("Error interno del servidor");
        }
        res.redirect("/carrito");
    });
};
