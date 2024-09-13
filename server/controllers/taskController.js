const router = require("express").Router();
const taskModel = require("../models/taskModels");

//POST - add task
router.post("/create", async (req, res) => {
    
    console.log(req.body);
    const { title, description, is_completed } = req.body;

    // Validate input 
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    //Call to Model 
    taskModel.addTask({ title, description, is_completed }, (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Failed to add task' });
        }
        res.status(201).json(result);
    });
});

//GET - get all tasks
router.get("/", async (req, res) => {
    taskModel.getAllTasks((error, tasks) => {
      if (error) {
        return res.status(500).json({ error: 'Failed to retrieve tasks' });
      }
      res.status(200).json(tasks);
    });
});

//DELETE - delete the task 
router.delete("/:id", async (req, res) => {
    const taskId = req.params.id;
  
    taskModel.deleteTask(taskId, (error) => {
      if (error) {
        return res.status(500).json({ error: 'Failed to delete task' });
      }
      res.status(200).json({ message: 'Task deleted successfully' });
    });
  });
  


module.exports = router;