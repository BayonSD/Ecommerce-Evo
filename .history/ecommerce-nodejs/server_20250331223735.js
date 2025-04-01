const express = require("express");
const dotenv = require("dotenv");
const mysql = require("mysql2");
const cors = require("cors");

// Rutas por página
const authRouter = require('./login/auth'); // Ruta para login

// Configurar variables de entorno
dotenv.config();

const app = express();

// Configurar EJS como motor de plantillas
app.set("view engine", "ejs");
app.set("views", __dirname);  // Apuntar directamente a la raíz del proyecto

// Middleware
app.use(express.json());
app.use(cors());

// Rutas específicas por página
app.use("/login", authRouter);  // Ruta para login

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

// Ruta principal para index
app.get("/", (req, res) => {
  res.render("index/index");  // Renderiza la vista 'index.ejs' dentro de la carpeta 'index'
});

// Ruta para login
app.get("/login", (req, res) => {
  res.render("login/login");  // Renderiza la vista 'login.ejs' dentro de la carpeta 'login'
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
