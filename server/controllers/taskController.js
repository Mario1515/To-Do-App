const router = require("express").Router();
const taskModel = require("../models/taskModels");

//POST - add task - "/create"
router.post("/create", async (req, res) => {
  const { title, description, is_completed } = req.body;

  // Validate input
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  if (description && description.length > 255) {
    return res.status(400).json({ error: 'Description cannot exceed 255 characters' });
  }

  //Call to Model
  taskModel.addTask({ title, description, is_completed }, (error, result) => {
    if (error) {
      return res.status(500).json({ error: "Failed to add task" });
    }
    res.status(201).json(result);
  });
});

//GET - get all tasks 
router.get("/", async (req, res) => {
  taskModel.getAllTasks((error, tasks) => {
    if (error) {
      return res.status(500).json({ error: "Failed to retrieve tasks" });
    }
    res.status(200).json(tasks);
  });
});

//DELETE - delete the task "/tasks/:id"
router.delete("/:id", async (req, res) => {
  const taskId = req.params.id;

  taskModel.deleteTask(taskId, (error) => {
    if (error) {
      return res.status(500).json({ error: "Failed to delete task" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  });
});

//EDIT - edit the task - "/tasks/:id"
router.put("/:id", async (req, res) => {
  const taskId = req.params.id;
  const { title, description, is_completed } = req.body;

  // Validate input
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  if (description && description.length > 255) {
    return res.status(400).json({ error: 'Description cannot exceed 255 characters' });
  }

  // Call to Model
  taskModel.updateTask(
    taskId,
    { title, description, is_completed },
    (error, result) => {
      if (error) {
        return res.status(500).json({ error: "Failed to update task" });
      }
      res.status(200).json(result);
    }
  );
});

//PATCH - update task status - "/tasks/:id"
router.patch("/:id", async (req, res) => {
  const taskId = req.params.id;
  const { is_completed } = req.body;

  if (is_completed === undefined) return res.status(400).json({ error: "Status is required" });

  taskModel.updateTaskStatus(taskId, { is_completed }, (error, result) => {
    if (error) {
      console.error("Failed to update task status:", error);
      return res.status(500).json({ error: "Failed to update task status" });
    }
    res.status(200).json(result);
  });
});

module.exports = router;
