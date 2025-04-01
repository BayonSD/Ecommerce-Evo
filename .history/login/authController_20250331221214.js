// login/authController.js

// Mostrar la página de login
exports.showLoginPage = (req, res) => {
  res.render('login');  // Asegúrate de que tienes el archivo 'login.ejs' en 'views'
};

// Procesar el login
exports.handleLogin = (req, res) => {
  // Lógica de autenticación (puedes usar base de datos, etc.)
  res.redirect('/');  // Redirigir al usuario después de login exitoso
};

// Cerrar sesión
exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/login');
  });
};
