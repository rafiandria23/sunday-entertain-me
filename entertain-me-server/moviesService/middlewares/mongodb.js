'use strict';

const { MongoClient, ObjectId } = require('mongodb');

// Connection URL
const url = `mongodb://localhost:27017`;

// Database Name
const dbName = 'entertainme';

// Create a new MongoClient;
const client = new MongoClient(url, { useUnifiedTopology: true });

module.exports = async (req, res, next) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    req.db = db;
    req.ObjectId = ObjectId;
    next();
  } catch (err) {
    next(err);
  }
};
