const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const client = new MongoClient(uri);

let db;

async function connectToDatabase() {
    if (db) return db;
    
    try {
        await client.connect();
        console.log('✓ Conectado exitosamente a MongoDB');
        
        db = client.db('giftlink');
        return db;
    } catch (error) {
        console.error('Error conectando a MongoDB:', error);
        throw error;
    }
}

async function getDatabase() {
    if (!db) {
        await connectToDatabase();
    }
    return db;
}

async function closeConnection() {
    await client.close();
}

module.exports = {
    connectToDatabase,
    getDatabase,
    closeConnection
};