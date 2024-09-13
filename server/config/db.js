const mysql = require('mysql');

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "tasks"
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MYSQL successfully!');
});

module.exports = db;