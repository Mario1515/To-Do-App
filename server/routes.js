const router = require("express").Router();

const taskController = require('./controllers/taskController');

router.use('/tasks', taskController); 

module.exports = router;