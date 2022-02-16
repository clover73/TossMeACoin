require('dotenv').config({ path: '.env' });

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const basicAuth = require('express-basic-auth');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');

const app = express();

mongoose.connect(process.env.MongoDBURL);
mongoose.connection.once('open', () => {
  console.log('Connected to database.');
});

app.use(helmet());
app.use(cors());
app.use(
  basicAuth({
    users: { admin: process.env.PASSWORD },
  })
);
app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

app.listen(4000, () => {
  console.log('Listening for requests on port: 4000');
});
