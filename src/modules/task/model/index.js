const { v4: uuid } = require('uuid');

const { collection } = require("../../../infra/database");

module.exports.findOneTask = (filter) => {
  return collection('tasks').findOne(filter, { projection: { _id: 0 } });
}

module.exports.findTasks = (filter = {}) => {
  return collection('tasks').find(filter, { projection: { _id: 0 } }).toArray();
}

module.exports.updateOneTask = (filter, data) => {
  return collection('tasks').updateOne(filter, { $set: data });
}

module.exports.deleteOneTask = (filter) => {
  return collection('tasks').deleteOne(filter);
}

module.exports.deleteManyTask = (filter) => {
  return collection('tasks').deleteMany(filter);
}

module.exports.insertOneTask = (data) => {
  return collection('tasks').insertOne({ id: uuid(), createdAt: new Date(Date.now()), done: false, ...data })
}
