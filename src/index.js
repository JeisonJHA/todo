require('dotenv/config');

const express = require('express');
const cors = require('cors');

require('express-async-errors')

const routes = require('./routes');
const { connect } = require('./infra/database');
const error = require('./middleware/error');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(error);

app.listen(3000, async () => {
  await connect();
  console.log(`Listening to the port: ${3000} 🚀`)
});
