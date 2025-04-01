// login/authController.js
const db = require('../../db'); // Ajusta según tu estructura de base de datos

// Mostrar la página de login
exports.showLoginPage = (req, res) => {
  res.render('login/auth');  // Renderiza la vista de login (auth.ejs)
};

// Manejar el login
exports.handleLogin = (req, res) => {
  const { username, password } = req.body;
  
  // Verificar en la base de datos si el usuario existe
  db.query('SELECT * FROM usuarios WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error(err);
      return res.redirect('/login');
    }

    if (results.length === 0) {
      return res.redirect('/login');
    }

    // Verificar si la contraseña es correcta (por ejemplo, usando bcrypt)
    const user = results[0];
    if (user.password === password) {  // Asegúrate de usar bcrypt o alguna función de encriptación en producción
      req.session.userId = user.id;  // Guardar el ID del usuario en la sesión
      return res.redirect('/perfil');
    } else {
      return res.redirect('/login');
    }
  });
};

// Logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect('/login');
  });
};
