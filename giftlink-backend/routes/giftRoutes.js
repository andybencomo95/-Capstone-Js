const express = require('express');
const { ObjectId } = require('mongodb');
const { connectToDatabase } = require('../models/db');

const router = express.Router();

// GET /api/gifts - Obtener todos los regalos
router.get('/', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const gifts = await db.collection('gifts').find({}).toArray();
        res.json(gifts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/gifts/:id - Obtener regalo por ID
router.get('/:id', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const gift = await db.collection('gifts')
            .findOne({ _id: new ObjectId(req.params.id) });
        
        if (!gift) {
            return res.status(404).json({ error: 'Regalo no encontrado' });
        }
        
        res.json(gift);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/gifts - Crear nuevo regalo
router.post('/', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const result = await db.collection('gifts').insertOne(req.body);
        res.status(201).json({ _id: result.insertedId, ...req.body });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /api/gifts/:id - Actualizar regalo
router.put('/:id', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const result = await db.collection('gifts')
            .findOneAndUpdate(
                { _id: new ObjectId(req.params.id) },
                { $set: req.body },
                { returnDocument: 'after' }
            );
        
        if (!result) {
            return res.status(404).json({ error: 'Regalo no encontrado' });
        }
        
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /api/gifts/:id - Eliminar regalo
router.delete('/:id', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const result = await db.collection('gifts')
            .deleteOne({ _id: new ObjectId(req.params.id) });
        
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Regalo no encontrado' });
        }
        
        res.json({ message: 'Regalo eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;