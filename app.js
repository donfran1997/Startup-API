const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const databaseConfig = require('./config/database');

const userRoutes = require('./routes/userRoutes');

// Connect the database
mongoose.connect('mongodb://localhost/vhub', { useMongoClient: true });
mongoose.Promise = global.Promise;

/*
mongoose.connect(databaseConfig.database, { useMongoClient: true });
mongoose.connection.on('connected', () => {
  console.log('Connected to database ' + databaseConfig.database);
});
mongoose.connection.on('error', (err) => {
  console.log('Database error ' + err);
});
*/

// Port Number
const port = 3000;

// Init App
const app = express();

// Cors Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// BodyParser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Routing
app.use('/user', userRoutes);

// Catch invalid endpoints
app.use('/', (req, res) => {
  res.send('Invalid Endpoint');
});

app.listen(port, () => {
  console.log('Server started on port ' + port);
});
