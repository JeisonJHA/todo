const { MongoClient } = require('mongodb');

let db;

module.exports.connect = async () => {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  db = client.db(process.env.MONGODB_DBNAME);
};

module.exports.collection = (name) => db.collection(name);
