'use strict';

require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const port = 3002;

const mongodb = require('./middlewares/mongodb');
const indexRouter = require('./routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongodb);

app.use(indexRouter);

app.listen(port, () => {
  console.log(
    `Entertain ME Server TV Series Service is running on PORT ${port}!`
  );
});
