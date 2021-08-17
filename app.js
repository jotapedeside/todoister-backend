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

/* GET all tasks. */
app.get('/task/:page/:pageLimit/:sort', function(req, res, next) {
  let perPage = req.params.pageLimit * 1;
  let currentPage = Math.max(0, req.params.page-1);
  let sortedBy = req.params.sort;
  
  let totalObjs = 0;  
  
  Task.find({ status: false }).limit(perPage).skip(perPage * currentPage).sort({ createdAt : sortedBy}).exec(function(error,docs) {
    if(error) {
      res.status(500).json({error: error.message});
      res.end();
      return;
    }

    Task.countDocuments({status: false},function(err, count) {
      if(err) totalObjs = -1;
        totalObjs = count;
        res.json({page: currentPage + 1, length: totalObjs, page_size: perPage , data: docs});
        res.end();
      });
    });  
});

/* GET all tasks done */
app.get('/done/:page/:pageLimit/:sort', function(req, res, next) {
  let perPage = req.params.pageLimit * 1;
  let currentPage = Math.max(0, req.params.page-1);
  let sortedBy = req.params.sort;
  
  let totalObjs = 0;  
  
  Task.find({ status: true }).limit(perPage).skip(perPage * currentPage).sort({ createdAt : sortedBy}).exec(function(error,docs) {
    if(error) {
      res.status(500).json({error: error.message});
      res.end();
      return;
    }

    Task.countDocuments({status: true},function(err, count) {
      if(err) totalObjs = -1;
        totalObjs = count;
        res.json({page: currentPage + 1, length: totalObjs, page_size: perPage , data: docs});
        res.end();
      });
    });  
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})