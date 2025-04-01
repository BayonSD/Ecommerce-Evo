// server.js

const express = require("express");
const dotenv = require("dotenv");
const mysql = require("mysql2");
const cors = require("cors");

// Rutas por página
const authRouter = require('./routes/auth');

// Configurar variables de entorno
dotenv.config();

const app = express();

// Configurar EJS como motor de plantillas
app.set("view engine", "ejs");
app.set("views", "./views");  // Configura la carpeta donde están tus vistas

// Middleware
app.use(express.json()); // Para manejar JSON
app.use(express.urlencoded({ extended: true })); // Middleware para manejar formularios (x-www-form-urlencoded)
app.use(cors());

// Rutas específicas por página
app.use("/login", authRouter);  // Ruta para login

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
