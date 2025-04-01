// authControllers.js
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Conexión a MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Error conectando a MySQL:", err);
    return;
  }
  console.log("Conectado a MySQL");
});

// Muestra la página de login
exports.showLoginPage = (req, res) => {
  res.render('login/login');  // Ajuste en la vista si usas subcarpetas
};

// Lógica para login (POST)
exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error("Error al consultar la base de datos:", err);
      return res.status(500).send("Error al procesar la solicitud.");
    }

    if (results.length === 0) {
      return res.status(400).send("Usuario no encontrado.");
    }

    const user = results[0];

    // Comparar la contraseña
    bcrypt.compare(password, user.password, (err, match) => {
      if (err) {
        console.error("Error al comparar contraseñas:", err);
        return res.status(500).send("Error al procesar la solicitud.");
      }

      if (match) {
        // Generar token JWT
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        // Devolver el token o redirigir al usuario
        res.json({ message: "Login exitoso", token });
      } else {
        return res.status(400).send("Contraseña incorrecta.");
      }
    });
  });
};

// Puedes agregar más funciones para registro y otras funcionalidades si es necesario
