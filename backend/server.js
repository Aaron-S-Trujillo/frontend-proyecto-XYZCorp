const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

// Importar rutas
const authRoutes = require('./routes/auth');
const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');

const app = express();
app.use(cors());
app.use(express.json());

// Usar rutas
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/orders', ordersRoutes);

// Ruta raíz de prueba
app.get('/', (req, res) => {
  res.send('API de Tienda Virtual funcionando 🚀');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
