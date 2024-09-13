const db = require("../config/db");

//ADD TASK 
const addTask = (task, callback) => {
  const { title, description, is_completed } = task;

  const query =
    "INSERT INTO tasks (title, description, is_completed) VALUES (?, ?, ?)";

  db.query(
    query,
    [title, description || null, is_completed || 0],
    (error, results) => {
      if (error) return callback(error, null);
      callback(null, { id: results.insertId, ...task });
    }
  );
};

//GET ALL TASKS
const getAllTasks = (callback) => {
  const query = "SELECT * FROM tasks";
  
  db.query(query, (error, results) => {
    if (error) return callback(error, null);
    callback(null, results);
  });
};

//DELETE TASK
const deleteTask = (taskId, callback) => {
  const query = 'DELETE FROM tasks WHERE id = ?';
  db.query(query, [taskId], (error, results) => {
    if (error) return callback(error);
    callback(null);
  });
};

module.exports = {
  addTask,
  getAllTasks,
  deleteTask,
};
