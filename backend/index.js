// index.js
const express = require("express");
const mysql = require("mysql2");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde /public
app.use(express.static(path.join(__dirname, "public")));

// Configuración de conexión a MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",       
  password: "",        
  database: "tienda_virtual" 
});

// Conectar a MySQL
db.connect((err) => {
  if (err) {
    console.error("❌ Error al conectar con MySQL:", err);
    return;
  }
  console.log("✅ Conectado a la base de datos MySQL.");
});

// RUTA DE PRUEBA
app.get("/api", (req, res) => {
  res.json({ message: "Servidor funcionando 🚀" });
});

// RUTA: obtener todos los productos
app.get("/api/productos", (req, res) => {
  db.query("SELECT * FROM productos", (err, results) => {
    if (err) {
      console.error("Error al obtener productos:", err);
      res.status(500).json({ error: "Error en el servidor" });
    } else {
      res.json(results);
    }
  });
});

// RUTA: obtener todos los usuarios
app.get("/api/usuarios", (req, res) => {
  db.query("SELECT * FROM usuarios", (err, results) => {
    if (err) {
      console.error("Error al obtener usuarios:", err);
      res.status(500).json({ error: "Error en el servidor" });
    } else {
      res.json(results);
    }
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
