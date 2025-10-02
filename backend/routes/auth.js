// /backend/routes/auth.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/register', async (req, res) => {
  const { nombre, email, password } = req.body;
  if (!nombre || !email || !password) return res.status(400).json({ message: 'Datos incompletos' });
  try {
    const [existing] = await pool.query('SELECT id FROM usuarios WHERE email = ?', [email]);
    if (existing.length) return res.status(409).json({ message: 'Usuario ya existe' });
    const hash = await bcrypt.hash(password, 10);
    const [result] = await pool.query('INSERT INTO usuarios (nombre, email, password_hash) VALUES (?, ?, ?)', [nombre, email, hash]);
    res.status(201).json({ id: result.insertId, nombre, email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en servidor' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Datos incompletos' });
  try {
    const [rows] = await pool.query('SELECT id, nombre, email, password_hash, rol FROM usuarios WHERE email = ?', [email]);
    if (!rows.length) return res.status(401).json({ message: 'Usuario no encontrado' });
    const user = rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ message: 'Credenciales inválidas' });
    const token = jwt.sign({ id: user.id, nombre: user.nombre, rol: user.rol }, process.env.JWT_SECRET || 'TuSecretoJWTAqui', { expiresIn: '8h' });
    res.json({ token, user: { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en servidor' });
  }
});

module.exports = router;
s