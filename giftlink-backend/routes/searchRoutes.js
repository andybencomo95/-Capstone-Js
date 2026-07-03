const express = require('express');
const { connectToDatabase } = require('../models/db');

const router = express.Router();

// GET /api/gifts/search?category=electronics
// Filtrar regalos por categoría
router.get('/', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const { category, query, minPrice, maxPrice } = req.query;
        
        // Construir filtro de búsqueda
        let filter = {};
        
        // Filtrar por categoría
        if (category) {
            filter.category = category;
        }
        
        // Filtrar por búsqueda de texto
        if (query) {
            filter.$or = [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ];
        }
        
        // Filtrar por rango de precios
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }
        
        const results = await db.collection('gifts')
            .find(filter)
            .toArray();
        
        res.json({
            count: results.length,
            results: results
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;