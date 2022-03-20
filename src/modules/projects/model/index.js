const { v4: uuid } = require('uuid');

const { collection } = require("../../../infra/database");

module.exports.findOneProject = (filter) => {
  return collection('projects').findOne(filter, { projection: { _id: 0 } });
}

module.exports.findProjects = (filter = {}) => {
  return collection('projects').find(filter, { projection: { _id: 0 } }).toArray();
}

module.exports.updateOneProject = (filter, data) => {
  return collection('projects').updateOne(filter, { $set: data });
}

module.exports.deleteOneProject = (filter) => {
  return collection('projects').deleteOne(filter);
}

module.exports.insertOneProject = (data) => {
  return collection('projects').insertOne({ id: uuid(), createdAt: new Date(Date.now()), ...data })
}
