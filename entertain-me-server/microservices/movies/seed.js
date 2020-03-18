'use strict';

const { MongoClient } = require('mongodb');

const url = `mongodb://localhost:27017`;

const dbName = 'entertainme';

const client = new MongoClient(url);

client.connect(async err => {
  const db = client.db(dbName);
  await db.createCollection('Movies');
  await db.createCollection('TV Series');
  await client.close();
});
