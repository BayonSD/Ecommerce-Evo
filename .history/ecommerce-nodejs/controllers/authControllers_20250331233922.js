// controllers/authControllers.js

const mysql = require('mysql2');
const dotenv = require('dotenv');
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
  res.render('login');  // Renderiza 'login.ejs' que debe estar en la carpeta 'views'
};

// Manejar el login de usuarios
exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  // Consultar el usuario en la base de datos
  db.query('SELECT * FROM usuarios WHERE email = ? AND password = ?', [email, password], (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      return res.status(500).send('Error en el servidor');
    }

    if (results.length === 0) {
      return res.status(401).send('Email o contraseña incorrectos');
    }

    // Usuario autenticado correctamente
    res.send('Usuario autenticado exitosamente');
    // Aquí puedes redirigir al usuario a otra página, como el inicio o su perfil
  });
};
