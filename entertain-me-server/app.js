"use strict";

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const mongodb = require('./middlewares/mongodb');

app.use(mongodb);

app.listen(() => {
  console.log(`Entertain ME Server is running on PORT ${port}!`);
}, port);
