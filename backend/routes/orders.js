const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { authenticateToken } = require('../middleware/authMiddleware');

// Create order
router.post('/', authenticateToken, async (req, res) => {
  const { items, total } = req.body; // items: [{producto_id, cantidad, precio_unitario}]
  if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ message: 'Items vacíos' });
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const [result] = await conn.query('INSERT INTO pedidos (usuario_id, total, estado) VALUES (?, ?, ?)', [req.user.id, total, 'creado']);
    const pedidoId = result.insertId;
    for (const it of items) {
      await conn.query('INSERT INTO pedido_items (pedido_id, producto_id, cantidad, precio_unitario) VALUES (?, ?, ?, ?)', [pedidoId, it.producto_id, it.cantidad, it.precio_unitario]);
      // decrement stock
      await conn.query('UPDATE productos SET stock = stock - ? WHERE id = ? AND stock >= ?', [it.cantidad, it.producto_id, it.cantidad]);
    }
    await conn.commit();
    res.status(201).json({ pedidoId });
  } catch (err) {
    await conn.rollback();
    console.error(err);
    res.status(500).json({ message: 'Error al crear pedido' });
  } finally {
    conn.release();
  }
});

// Get orders for user (or all if admin)
router.get('/', authenticateToken, async (req, res) => {
  try {
    if (req.user.rol === 'admin') {
      const [rows] = await pool.query('SELECT * FROM pedidos ORDER BY creado_en DESC');
      return res.json(rows);
    } else {
      const [rows] = await pool.query('SELECT * FROM pedidos WHERE usuario_id = ? ORDER BY creado_en DESC', [req.user.id]);
      return res.json(rows);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en servidor' });
  }
});

module.exports = router;
