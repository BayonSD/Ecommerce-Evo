const express = require("express");
const dotenv = require("dotenv");
const mysql = require("mysql2");
const cors = require("cors");
const webRouter = require("./routes/web");
const tarjetasRouter = require("./routes/tarjetas");
const productosRouter = require("./routes/productos"); // Añadido para las rutas de productos

// Configurar variables de entorno
dotenv.config();

const app = express();

// Configurar EJS como motor de plantillas
app.set("view engine", "ejs");
app.set("views", "./views"); // Configura la carpeta donde están tus vistas

// Middleware
app.use(express.json());
app.use(cors());
app.use("/", webRouter);

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

// Usar rutas
app.use("/tarjetas", tarjetasRouter);
app.use("/productos", productosRouter); // Ruta para productos

// Ruta principal
app.get("/", (req, res) => {
  res.render("index"); // Usa render para mostrar la vista 'index.ejs'
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
