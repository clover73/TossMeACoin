require('dotenv').config({ path: '.env' });

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');

const app = express();

mongoose.connect(process.env.MongoDBURL);
mongoose.connection.once('open', () => {
  console.log('Connected to database.');
});

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

app.listen(4000, () => {
  console.log('Listening for requests on port: 4000');
});
