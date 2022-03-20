const { v4: uuid } = require('uuid');

const { collection } = require('../../../infra/database');

module.exports.findOneProject = async (filter) => (await collection('projects').aggregate([
  { $match: filter },
  {
    $lookup: {
      from: 'tasks',
      localField: 'id',
      foreignField: 'projectId',
      as: 'tasks',
    },
  },
  {
    $project: {
      _id: 0,
      'tasks._id': 0,
    },
  },
]).toArray())[0];

module.exports.findProjects = (filter = {}) => collection('projects').aggregate([
  { $match: filter },
  {
    $lookup: {
      from: 'tasks',
      localField: 'id',
      foreignField: 'projectId',
      as: 'tasks',
    },
  },
  {
    $project: {
      _id: 0,
      'tasks._id': 0,
    },
  },
]).toArray();

module.exports.updateOneProject = (filter, data) => collection('projects').updateOne(filter, { $set: data });

module.exports.deleteOneProject = (filter) => collection('projects').deleteOne(filter);

module.exports.insertOneProject = (data) => collection('projects').insertOne({ id: uuid(), createdAt: new Date(Date.now()), ...data });
