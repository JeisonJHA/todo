const { v4: uuid } = require('uuid');

const { collection } = require('../../../infra/database');

module.exports.findOneTask = (filter) => collection('tasks').findOne(filter, { projection: { _id: 0 } });

module.exports.findTasks = (filter = {}) => collection('tasks').find(filter, { projection: { _id: 0 } }).toArray();

module.exports.updateOneTask = (filter, data) => collection('tasks').updateOne(filter, { $set: data });

module.exports.deleteOneTask = (filter) => collection('tasks').deleteOne(filter);

module.exports.deleteManyTask = (filter) => collection('tasks').deleteMany(filter);

module.exports.insertOneTask = (data) => collection('tasks').insertOne({
  id: uuid(), createdAt: new Date(Date.now()), done: false, ...data,
});
