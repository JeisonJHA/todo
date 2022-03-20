const { findOneUser } = require('./model');

module.exports = (login) => findOneUser({ login });
