var express = require('express');
var router = express.Router();
var todo = require('../models/todo')

/* GET home page. */
router.get('/', function (req, res, next) {
  todo.find({}).then(function (todos) {
    res.render('index', { title: "Daily Todo", "todolist": todos });
  })
});

// Create Todo
router.post('/', function (req, res, next) {
  todo.create({
    taskname: req.body.taskname,
    taskdate: req.body.taskdate,
    done: false
  }, function (error, createdTodo) {

    todo.find({}).then(function (todos) {
      if (error) {
        res.render('index', { title: "Validation Error Problem", todolist: todos })
      }
      res.render('index', { title: "Successfully Creted a Todo", "todolist": todos });

    })
  })
});

// Delete Todo
router.post('/delete', function (req, res, next) {
  console.log("Deleted");
  let taskId = req.body.taskId;
  todo.findByIdAndRemove({ _id: taskId }, function (err) {
    if (!err) {
      res.status(200).json({ 'status': 200, 'message': 'Deleted' })
    }
    else {
      res.status(200).json({ 'status': 'Some problem in deletion' + err })
    }
  });
});

//Mark as complete
router.post('/complete', function (req, res, next) {
  let taskId = req.body.taskId;

  todo.updateOne({ _id: taskId }, {
    done: true
  }, function (err, resp) {
    if (!err) {
      res.status(200).json({ 'status': 200, 'message': 'Completed' })
    }
    else {
      res.status(500).json({ 'status': 500, 'message': 'Some problem in updating' + err })
    }
  });
});
module.exports = router;
