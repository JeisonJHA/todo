const authenticate = require("./authenticate");

module.exports = async (request, response) => {
  const { login, password } = request.body;
  const token = await authenticate(login, password);
  return response.send({ token });
}
