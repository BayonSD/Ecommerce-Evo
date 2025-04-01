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

// Mostrar la página de registro
exports.showRegisterPage = (req, res) => {
  res.render('register');  // Renderiza 'register.ejs' que debe estar en la carpeta 'views'
};

// Manejar el registro de usuarios
exports.registerUser = (req, res) => {
  const { nombre, email, password } = req.body;

  console.log(req.body); // Añade esta línea para depurar y ver qué está recibiendo el servidor

  // Verificar si el email ya está registrado
  db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      return res.status(500).send('Error en el servidor');
    }

    if (results.length > 0) {
      return res.status(400).send('Este correo electrónico ya está registrado');
    }

    // Insertar el nuevo usuario en la base de datos
    db.query(
      'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
      [nombre, email, password],
      (err, results) => {
        if (err) {
          console.error('Error al registrar el usuario:', err);
          return res.status(500).send('Error al registrar el usuario');
        }

        // Usuario registrado correctamente
        res.send('Usuario registrado exitosamente');
        // Aquí puedes redirigir al usuario a la página de login, por ejemplo
      }
    );
  });
};
