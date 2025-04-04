require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const session = require("express-session");
const productosRoutes = require("./routes/productosRoutes"); // Asegúrate de que esta ruta sea correcta
const carritoRoutes = require("./routes/carritoRoutes"); // Agregar la ruta de carrito

// Importar controladores
const authControllers = require("./controllers/authControllers");
const productosControllers = require("./controllers/productosControllers");

const app = express();

// Configurar EJS
app.set("view engine", "ejs");
app.set("views", "./views");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Configurar sesión
app.use(session({
  secret: "secreto", 
  resave: false,
  saveUninitialized: true
}));

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

// Usar las rutas de productos
app.use(productosRoutes); // Esto maneja todas las rutas de productos

// Usar las rutas de carrito
app.use('/carrito', carritoRoutes); // Esto maneja las rutas de carrito

// Rutas de autenticación
app.get("/login", authControllers.getLoginPage);
app.post("/login", authControllers.loginUser);
app.get("/register", authControllers.getRegisterPage);
app.post("/register", authControllers.registerUser);

// Ruta raíz
app.get("/", (req, res) => {
  const user = req.session.user; // Accede al usuario desde la sesión
  db.query("SELECT * FROM productos", (err, productos) => {
    if (err) {
      console.error("Error al obtener productos:", err);
      return res.status(500).send("Error al obtener productos");
    }
    res.render("index", { user, productos }); // Pasa el usuario y los productos a la vista
  });
});

// Middleware para verificar sesión antes de ciertas acciones
const verificarSesion = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ mensaje: "Debes iniciar sesión" });
  }
  next();
};

// Ruta protegida de ejemplo (agregar al carrito, comprar, etc.)
app.post("/agregar-al-carrito", verificarSesion, (req, res) => {
  res.send("Producto agregado al carrito");
});

// Ruta para confirmar compra (de ejemplo)
app.post("/confirmar-compra", verificarSesion, (req, res) => {
  res.send("Compra confirmada");
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
