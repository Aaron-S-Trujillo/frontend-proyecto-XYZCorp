// /backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token no proporcionado' });
  jwt.verify(token, process.env.JWT_SECRET || 'TuSecretoJWTAqui', (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    req.user = user;
    next();
  });
}

function optionalAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) { req.user = null; return next(); }
  jwt.verify(token, process.env.JWT_SECRET || 'TuSecretoJWTAqui', (err, user) => {
    if (err) { req.user = null; return next(); }
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken, optionalAuth };
