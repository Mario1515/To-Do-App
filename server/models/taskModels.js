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

//EDIT Task
const updateTask = (taskId, task, callback) => {
  const { title, description, is_completed } = task;

  const query = 
    "UPDATE tasks SET title = ?, description = ?, is_completed = ?, updated_at = NOW() WHERE id = ?";

  db.query(
    query,
    [title, description || null, is_completed || 0, taskId],
    (error, results) => {
      if (error) return callback(error, null);
      if (results.affectedRows === 0) return callback(new Error('Task not found'), null);
      callback(null, { id: taskId, ...task });
    }
  );
};

//UPDATE Task Status
const updateTaskStatus = (taskId, { is_completed }, callback) => {
  const query = 
    "UPDATE tasks SET is_completed = ?, updated_at = NOW() WHERE id = ?";

    db.query(
      query,
      [is_completed, taskId],
      (error, results) => {
        if (error) return callback(error, null);
        if (results.affectedRows === 0) return callback(new Error('Task not found'), null);
        db.query('SELECT * FROM tasks WHERE id = ?', [taskId], (err, [task]) => {
          if (err) return callback(err, null);
          callback(null, task);
        });
      }
  );
};

module.exports = {
  addTask,
  getAllTasks,
  deleteTask,
  updateTask,
  updateTaskStatus,
};