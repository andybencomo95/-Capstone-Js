const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const { connectToDatabase } = require('../models/db');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// POST /api/auth/register - Registrar usuario
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const db = await connectToDatabase();
        
        // Verificar si usuario existe
        const existingUser = await db.collection('users').findOne({ email });
        
        if (existingUser) {
            return res.status(400).json({ error: 'Usuario ya existe' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const result = await db.collection('users').insertOne({
            username,
            email,
            password: hashedPassword,
            createdAt: new Date()
        });
        
        res.status(201).json({ 
            message: 'Usuario creado',
            userId: result.insertedId 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/auth/login - Iniciar sesión
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const db = await connectToDatabase();
        
        // Buscar usuario actual en la base de datos
        const user = await db.collection('users').findOne({ email });
        
        if (!user) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        
        const isValid = await bcrypt.compare(password, user.password);
        
        if (!isValid) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        res.json({
            message: 'Login exitoso',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/auth/me - Obtener usuario actual
router.get('/me', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        const db = await connectToDatabase();
        
        const user = await db.collection('users')
            .findOne({ _id: new ObjectId(decoded.userId) });
        
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        
        res.json({
            id: user._id,
            username: user.username,
            email: user.email
        });
    } catch (error) {
        res.status(401).json({ error: 'Token inválido' });
    }
});

module.exports = router;