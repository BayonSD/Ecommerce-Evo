const mysql = require('mysql2');
const bcrypt = require('bcryptjs');

// Conexión a la base de datos
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

exports.showLoginPage = (req, res) => {
  res.render('login');  // Renderiza la vista 'login.ejs'
};

exports.handleLogin = (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error("Error de base de datos:", err);
      return res.status(500).send('Error interno del servidor');
    }

    if (results.length === 0) {
      return res.status(401).send('Usuario no encontrado');
    }

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error("Error al comparar contraseñas:", err);
        return res.status(500).send('Error al procesar la contraseña');
      }

      if (isMatch) {
        req.session.userId = user.id;  // Almacena el ID de usuario en la sesión
        return res.redirect('/');
      } else {
        return res.status(401).send('Contraseña incorrecta');
      }
    });
  });
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};
