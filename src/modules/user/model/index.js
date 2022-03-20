const { v4: uuid } = require('uuid');

const { collection } = require('../../../infra/database');

module.exports.findOneUser = (filter) => collection('user').findOne(filter);

module.exports.insertOneUser = (data) => collection('user').insertOne({ id: uuid(), createdAt: new Date(Date.now()), ...data });
