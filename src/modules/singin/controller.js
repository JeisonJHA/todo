const authenticate = require("../login/authenticate");
const createLogin = require("./createLogin");

module.exports = async (request, response) => {
  const { login, password, userName } = request.body;
  await createLogin(login, password, userName);
  const token = await authenticate(login, password);
  return response.send({ token });
}
