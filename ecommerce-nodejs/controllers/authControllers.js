const db = require('../db');

// Mostrar la página de login
exports.getLoginPage = (req, res) => {
  res.render('login', { error: null });  // Pasamos 'error: null' por si no hay error
};

// Procesar el login
exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM usuarios WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Error al verificar usuario:', err);
      return res.status(500).send('Error interno del servidor');
    }

    if (results.length > 0) {
      const user = results[0];

      if (user.password === password) {
        req.session.user = user;
        return res.redirect('/');
      } else {
        return res.render('login', { error: 'Email o contraseña incorrectos' });
      }
    } else {
      return res.render('login', { error: 'Email o contraseña incorrectos' });
    }
  });
};

// Mostrar la página de registro
exports.getRegisterPage = (req, res) => {
  res.render('register', { error: null });  // Pasamos 'error: null' por si no hay error
};

// Procesar el registro
exports.registerUser = (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (!email || !password || !confirmPassword) {
    return res.render("register", { error: "Por favor ingresa todos los campos" });
  }

  if (password !== confirmPassword) {
    return res.render("register", { error: "Las contraseñas no coinciden" });
  }

  const query = "INSERT INTO usuarios (email, password) VALUES (?, ?)";
  db.query(query, [email, password], (err, result) => {
    if (err) {
      console.error("Error al registrar usuario:", err);
      return res.status(500).send("Error interno del servidor");
    }

    return res.render("register", { success: "Usuario creado exitosamente. Ahora puedes iniciar sesión." });
  });
};
