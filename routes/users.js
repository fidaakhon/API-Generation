var express = require('express');
var router = express.Router();
var data = require('../data');


// CREATE a new user
router.post('/', function(req, res, next) {
  // Generate a new ID for the user
  const newId = data.length + 1;

  // Create a new user object with the data from the request body
  const newUser = {
    id: newId,
    name: req.body.name,
    age: req.body.age
  };

  // Add the new user to the data array
  data.push(newUser);

  // Return the new user object
  res.status(201).send(newUser);
});

// READ all users
router.get('/', function(req, res, next) {
  res.send(data);
});

// READ a user by ID
router.get('/:id', function(req, res, next) {
  const userId = req.params.id;
  const user = data.find(u => u.id === parseInt(userId));

  if (!user) {
    return res.status(404).send('User not found');
  }

  res.send(user);
});

// UPDATE a user by ID
router.put('/:id', function(req, res, next) {
  const userId = req.params.id;
  const user = data.find(u => u.id === parseInt(userId));

  if (!user) {
    return res.status(404).send('User not found');
  }

  // Update the user's information with the data in the request body
  user.name = req.body.name || user.name;
  user.age = req.body.age || user.age;

  // Return the updated user
  res.send(user);
});

// DELETE a user by ID
router.delete('/:id', function(req, res, next) {
  const userId = req.params.id;
  const index = data.findIndex(u => u.id === parseInt(userId));

  if (index === -1) {
    return res.status(404).send('User not found');
  }

  // Remove the user from the data array
  data.splice(index, 1);

  // Return a success message
  res.send('User deleted successfully');
});

module.exports = router;