var express = require('express');
var router = express.Router();
var todo = require('../models/todo')

/* GET home page. */
router.get('/', function (req, res, next) {
  todo.find({}).then(function (todos) {
    res.render('index', { title: "Daily Todo", "todolist": todos });
  })
});
router.post('/', function (req, res, next) {
  todo.create({
    taskname: req.body.taskname,
    taskdate: req.body.taskdate,
    done: false
  }, function (error, createdTodo) {
    if (error) {
      res.render('index', { title: "Some Problem" })
    }
    todo.find({}).then(function (todos) {
      res.render('index', { title: "Successfully Creted a Todo", "todolist": todos });
    })
  })
});

router.post('/delete', function (req, res, next) {
  console.log("Deleted");
  let taskId = req.body.taskId;
  todo.findByIdAndRemove({ _id: taskId }, function (err) {
    if (!err) {
      res.status(200).json({ 'status':200,'message': deletedTodo.name + 'Deleted' })
    }
    else {
      res.status(200).json({ 'status': 'Some problem in deletion' + err })
    }
  });
});

module.exports = router;
