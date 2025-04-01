require("dotenv").config();  // Cargar variables de entorno lo primero
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

// Rutas
const authRouter = require('./routes/auth');

const app = express();

// Configurar EJS
app.set("view engine", "ejs");
app.set("views", "./views");

// Middleware
app.use(express.json());
app.use(cors());

// Rutas
app.use("/login", authRouter);

// Verificar que las variables están cargadas
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? "Cargada" : "No cargada");

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

// Ruta principal
app.get("/", (req, res) => {
  res.render("index");
});

// Ruta principal
app.get("/login", (req, res) => {
  res.render("login");
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
