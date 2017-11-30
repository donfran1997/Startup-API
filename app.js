const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Port Number
const port = 3000;

// Init App
const app = express();

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// BodyParser Middleware
app.use(bodyParser.json());

app.listen(port, () => {
  console.log('Server started on port ' + port);
});
