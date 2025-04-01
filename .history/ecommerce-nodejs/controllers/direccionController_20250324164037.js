const db = require("../db");  // La conexión a la base de datos

// Función para agregar una nueva dirección
exports.agregarDireccion = (req, res) => {
  const { usuario_id, direccion, ciudad, codigo_postal } = req.body;

  if (!usuario_id || !direccion || !ciudad || !codigo_postal) {
    return res.status(400).send("Faltan datos.");
  }

  const query = 'INSERT INTO direcciones (usuario_id, direccion, ciudad, codigo_postal) VALUES (?, ?, ?, ?)';
  db.query(query, [usuario_id, direccion, ciudad, codigo_postal], (err, result) => {
    if (err) {
      return res.status(500).send("Error al agregar la dirección.");
    }
    res.status(200).send("Dirección agregada correctamente.");
  });
};

// Función para obtener todas las direcciones de un usuario
exports.obtenerDirecciones = (req, res) => {
  const { usuario_id } = req.params;
  const query = 'SELECT * FROM direcciones WHERE usuario_id = ?';
  db.query(query, [usuario_id], (err, result) => {
    if (err) {
      return res.status(500).send("Error al obtener las direcciones.");
    }
    res.status(200).json(result);
  });
};

// Función para eliminar una dirección
exports.eliminarDireccion = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM direcciones WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).send("Error al eliminar la dirección.");
    }
    if (result.affectedRows === 0) {
      return res.status(404).send("Dirección no encontrada.");
    }
    res.status(200).send("Dirección eliminada correctamente.");
  });
};
