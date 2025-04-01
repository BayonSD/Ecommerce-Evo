// login/authController.js
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');  // Asegúrate de tener bcryptjs instalado

// Conexión a la base de datos
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = {
  // Mostrar página de login
  showLoginPage: (req, res) => {
    res.render('login');  // Asegúrate de tener 'login.ejs' en views
  },

  // Manejar el login
  handleLogin: (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error en la base de datos');
      }

      if (results.length === 0) {
        return res.status(400).send('Usuario no encontrado');
      }

      const user = results[0];
      // Comparar la contraseña
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Error al comparar contraseñas');
        }

        if (isMatch) {
          req.session.userId = user.id;  // Guardamos el ID de usuario en la sesión
          return res.redirect('/');  // Redirigir a la página principal o a donde necesites
        } else {
          return res.status(400).send('Contraseña incorrecta');
        }
      });
    });
  },

  // Manejar logout
  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error al cerrar sesión');
      }
      res.redirect('/login');  // Redirigir a la página de login
    });
  }
};
