const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const databaseConfig = require('../config/database');

router.post('/register', (req, res, next) => {
  // Check username isn't already taken
  User.getUserByUserName(req.body.username, (err, user) => {
    if (err) throw err;
    if (user) {
      return res.json({ success: false, msg: 'Username already exists' });
    }
  });

  // TODO: Check email isn't already in use

  // Create a new user object
  let newUser = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  // Add the user to the database
  User.addUser(newUser, (err) => {
    if (err) {
      return res.json({ success: false, msg: 'Failed to Register' });
    } else {
      return res.json({ success: true, msg: 'User Registered' });
    }
  });
});

router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, msg: 'User not found' });
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        return res.json({ success: true, msg: 'Password correct' });
      } else {
        return res.json({ success: false, msg: 'Password Incorrect' });
      }
    });
  });
});

router.post('/login', (req, res, next) => {
  console.log(req.body);
  res.send('LOGIN REQUEST');
});

router.post('/logout', (req, res, next) => {
  console.log(req.body);
  res.send('LOGOUT REQUEST');
});

router.get('/profile/:id', (req, res, next) => {
  console.log(req.body);
  res.send({
    username: 'username',
    email: 'username@email',
    password: 'xxxx',
  });
});

module.exports = router;
