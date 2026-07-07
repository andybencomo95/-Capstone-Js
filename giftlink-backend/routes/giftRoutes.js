const express = require('express');
const { ObjectId } = require('mongodb');
const { connectToDatabase } = require('../models/db');
const { analyzeGiftDescription } = require('../sentiment');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const db = await connectToDatabase();
    res.json(await db.collection('gifts').find({}).toArray());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const gift = await db.collection('gifts').findOne({ _id: new ObjectId(req.params.id) });
    if (!gift) return res.status(404).json({ error: 'Regalo no encontrado' });
    res.json(gift);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const gift = { ...req.body, sentiment: analyzeGiftDescription(req.body.description) };
    const result = await db.collection('gifts').insertOne(gift);
    res.status(201).json({ _id: result.insertedId, ...gift });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const result = await db.collection('gifts').findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body },
      { returnDocument: 'after' }
    );
    if (!result) return res.status(404).json({ error: 'Regalo no encontrado' });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const result = await db.collection('gifts').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Regalo no encontrado' });
    res.json({ message: 'Regalo eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
