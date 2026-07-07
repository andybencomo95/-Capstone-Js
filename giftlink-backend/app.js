require('./env');
const express = require('express');
const { connectToDatabase } = require('./models/db');
const searchRoutes = require('./routes/searchRoutes');
const giftRoutes = require('./routes/giftRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// ponytail: tiny CORS middleware, replaces the cors dependency
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});
app.use(express.json());

// search must be registered before /api/gifts, otherwise /:id catches "search"
app.use('/api/gifts/search', searchRoutes);
app.use('/api/gifts', giftRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.json({ status: 'OK', message: 'GiftLink API' }));

connectToDatabase()
  .then(() => app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`)))
  .catch((err) => {
    console.error('No se pudo conectar a MongoDB:', err);
    process.exit(1);
  });

module.exports = app;
