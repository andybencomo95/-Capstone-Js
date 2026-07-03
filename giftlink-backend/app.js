const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./models/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar a MongoDB al iniciar
connectToDatabase();

// Rutas
const giftRoutes = require('./routes/giftRoutes');
const searchRoutes = require('./routes/searchRoutes');
const authRoutes = require('./routes/authRoutes');

// Rutas de la API
app.use('/api/gifts', giftRoutes);
app.use('/api/gifts/search', searchRoutes);
app.use('/api/auth', authRoutes);

// Ruta de health check
app.get('/', (req, res) => {
    res.json({ status: 'OK', message: 'GiftLink API' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`✓ Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;