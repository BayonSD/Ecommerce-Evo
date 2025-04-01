const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Configurar variables de entorno
dotenv.config();

// Conexión a la base de datos
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Mostrar la página de login
exports.showLoginPage = (req, res) => {
  res.render("/login");  // Asegúrate de que la vista está bien ubicada
};

// Función para login de usuario
exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email y contraseña son requeridos.");
  }

  const query = "SELECT * FROM usuarios WHERE email = ?";
  db.execute(query, [email], (err, results) => {
    if (err) {
      return res.status(500).send("Error en la consulta.");
    }

    if (results.length === 0) {
      return res.status(401).send("Usuario no encontrado.");
    }

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).send("Error al verificar la contraseña.");
      }
      if (!isMatch) {
        return res.status(401).send("Contraseña incorrecta.");
      }

      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ message: "Inicio de sesión exitoso", token });
    });
  });
};

// Función para registrar un usuario
exports.registerUser = (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).send("Todos los campos son requeridos.");
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).send("Error al cifrar la contraseña.");
    }

    const query = "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)";
    db.execute(query, [nombre, email, hashedPassword], (err, result) => {
      if (err) {
        return res.status(500).send("Error al registrar el usuario.");
      }

      res.status(201).send("Usuario registrado exitosamente.");
    });
  });
};
