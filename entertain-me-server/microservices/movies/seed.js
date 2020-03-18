'use strict';

const { MongoClient } = require('mongodb');

const url = `mongodb://localhost:27017`;

const dbName = 'entertainme';

const client = new MongoClient(url, { useUnifiedTopology: true });

const seed = async () => {
  try {
    await client.connect();
    const db = client.db(dbName);
    await db.createCollection('Movies');
    await db.createCollection('TV Series');
  } catch (err) {
    console.log(err);
  }
};

seed();
