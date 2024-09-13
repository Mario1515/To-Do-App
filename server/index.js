const express = require('express');
const cors = require('cors');
const routes = require("./routes");
const mysql = require('mysql');
const db = require('./config/db'); 

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); 
app.use(routes);

app.listen(PORT, console.log(`Server is listening on ${PORT}`));
