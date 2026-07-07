const express = require('express');
const crypto = require('crypto');
const { ObjectId } = require('mongodb');
const { connectToDatabase } = require('../models/db');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

function hashPassword(password) {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16);
    crypto.scrypt(password, salt, 64, (err, derived) =>
      err ? reject(err) : resolve(salt.toString('hex') + ':' + derived.toString('hex')));
  });
}

function verifyPassword(password, stored) {
  return new Promise((resolve, reject) => {
    const [salt, key] = stored.split(':');
    crypto.scrypt(password, Buffer.from(salt, 'hex'), 64, (err, derived) => {
      if (err) return reject(err);
      try {
        resolve(crypto.timingSafeEqual(Buffer.from(key, 'hex'), derived));
      } catch {
        resolve(false);
      }
    });
  });
}

function signToken(payload) {
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = crypto.createHmac('sha256', JWT_SECRET).update(body).digest('base64url');
  return `${body}.${sig}`;
}

function verifyToken(token) {
  const [body, sig] = String(token).split('.');
  const expected = crypto.createHmac('sha256', JWT_SECRET).update(body).digest('base64url');
  if (sig !== expected) throw new Error('invalid token');
  return JSON.parse(Buffer.from(body, 'base64url').toString());
}

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const db = await connectToDatabase();

    if (await db.collection('users').findOne({ email })) {
      return res.status(400).json({ error: 'Usuario ya existe' });
    }

    const result = await db.collection('users').insertOne({
      username,
      email,
      password: await hashPassword(password),
      createdAt: new Date()
    });

    res.status(201).json({ message: 'Usuario creado', userId: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = await connectToDatabase();

    const user = await db.collection('users').findOne({ email });
    if (!user || !(await verifyPassword(password, user.password))) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = signToken({ userId: user._id, email: user.email });

    res.json({
      message: 'Login exitoso',
      token,
      user: { id: user._id, username: user.username, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = verifyToken(token);
    const db = await connectToDatabase();

    const user = await db.collection('users').findOne({ _id: new ObjectId(decoded.userId) });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json({ id: user._id, username: user.username, email: user.email });
  } catch {
    res.status(401).json({ error: 'Token inválido' });
  }
});

module.exports = router;
