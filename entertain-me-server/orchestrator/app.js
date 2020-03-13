'use strict';

const { ApolloServer } = require('apollo-server');
// const express = require('express');
// const app = express();
// const cors = require('cors');
// const port = process.env.PORT || 3000;

// const indexRouter = require('./routes');

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.get('/', (req, res, next) => {
//   res.redirect('/entertainme');
// });

// app.use('/entertainme', indexRouter);

// app.listen(port, () => {
//   console.log(`Entertain ME Server is running on PORT ${port}!`);
// });

const mergedSchemas = require('./schemas');

const server = new ApolloServer({
  schema: mergedSchemas
});

server
  .listen()
  .then(({ url }) => console.log(`Entertain ME Server is running at ${url}`));
