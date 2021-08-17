require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = 3000
var db = require('./db');
var Task = db.Mongoose.model('tasks', db.taskSchema, 'tasks');

/* GET home */
app.get('/', (req, res) => {
  res.send('Hello World!')
})

/* POST one task */
app.post('/task', function(req, res, next){
  Task.create(req.body, (error) => {
    if(error) {
      res.status(500).json({ error: error.message });
      res.end();
      return;
    }
    res.json(req.body);
    res.end();
    return;
  })
})

app.post('/task', function(req, res, next){
  Task.create(req.body, (error) => {
    if(error) {
      res.status(500).json({ error: error.message });
      res.end();
      return;
    }
    res.json(req.body);
    res.end();
    return;
  })
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})