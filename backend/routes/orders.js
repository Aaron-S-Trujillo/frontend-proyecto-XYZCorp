// /backend/routes/orders.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { optionalAuth } = require('../middleware/authMiddleware');

// POST /api/orders
router.post('/', optionalAuth, async (req, res) => {
  const { items, total } = req.body; // items: [{producto_id, cantidad, precio_unitario}]
  if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ message: 'Items vacíos' });

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const usuarioId = req.user ? req.user.id : null;
    const [result] = await conn.query('INSERT INTO pedidos (usuario_id, total, estado) VALUES (?, ?, ?)', [usuarioId, total, 'creado']);
    const pedidoId = result.insertId;

    for (const it of items) {
      // check stock
      const [pRows] = await conn.query('SELECT stock FROM productos WHERE id = ? FOR UPDATE', [it.producto_id]);
      if (!pRows.length) throw new Error('Producto no encontrado');
      if (pRows[0].stock < it.cantidad) throw new Error(`Stock insuficiente para producto ${it.producto_id}`);
      await conn.query('INSERT INTO pedido_items (pedido_id, producto_id, cantidad, precio_unitario) VALUES (?, ?, ?, ?)', [pedidoId, it.producto_id, it.cantidad, it.precio_unitario]);
      await conn.query('UPDATE productos SET stock = stock - ? WHERE id = ?', [it.cantidad, it.producto_id]);
    }

    await conn.commit();
    res.status(201).json({ pedidoId });
  } catch (err) {
    await conn.rollback();
    console.error(err);
    res.status(500).json({ message: err.message || 'Error al crear pedido' });
  } finally {
    conn.release();
  }
});

// GET /api/orders  (para usuario autenticado devuelve los suyos; admin todos)
router.get('/', optionalAuth, async (req, res) => {
  try {
    if (req.user && req.user.rol === 'admin') {
      const [rows] = await pool.query('SELECT * FROM pedidos ORDER BY creado_en DESC');
      return res.json(rows);
    } else if (req.user) {
      const [rows] = await pool.query('SELECT * FROM pedidos WHERE usuario_id = ? ORDER BY creado_en DESC', [req.user.id]);
      return res.json(rows);
    } else {
      return res.status(401).json({ message: 'Autenticación requerida' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en servidor' });
  }
});

module.exports = router;
