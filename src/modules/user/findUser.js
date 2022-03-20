const { findOneUser } = require("./model");

module.exports = (login) => {
  return findOneUser({ login });
}
