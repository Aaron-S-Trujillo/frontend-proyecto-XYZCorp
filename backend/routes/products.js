const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { authenticateToken } = require('../middleware/authMiddleware');

// List products
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT p.id, p.nombre, p.descripcion, p.precio, p.stock, p.imagen, c.nombre as categoria FROM productos p LEFT JOIN categorias c ON p.categoria_id = c.id');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en servidor' });
  }
});

// Get product by id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM productos WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en servidor' });
  }
});

// Create product (admin only)
router.post('/', authenticateToken, async (req, res) => {
  try {
    if (req.user.rol !== 'admin') return res.status(403).json({ message: 'Acceso denegado' });
    const { nombre, descripcion, precio, stock, imagen, categoria_id } = req.body;
    const [result] = await pool.query('INSERT INTO productos (nombre, descripcion, precio, stock, imagen, categoria_id) VALUES (?, ?, ?, ?, ?, ?)', [nombre, descripcion, precio, stock, imagen, categoria_id]);
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en servidor' });
  }
});

module.exports = router;
