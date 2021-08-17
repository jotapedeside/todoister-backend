const express = require('express')
const app = express();
const router = express.Router();
const port = 3000
const mongoose = require('mongoose');
const db = require('./db');

router.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})