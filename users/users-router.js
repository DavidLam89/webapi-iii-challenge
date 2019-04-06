const express = require('express');

const Users = require('./userDb.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await Users.get(req.query);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving the users',
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await Users.getById(req.params.id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving the user',
    });
  }
});

router.post('/', upperCase, async (req, res) => {
  try {
    const user = await Users.insert(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      message: 'Error adding the user',
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const count = await Users.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: 'The user has been removed' });
    } else {
      res.status(404).json({ message: 'The user could not be found' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error removing the user',
    });
  }
});

router.put('/:id',upperCase , async (req, res) => {
  try {
    const user = await Users.update(req.params.id, req.body);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'The user could not be found' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error updating the user',
    });
  }
});

router.get('/:id/posts', async (req, res) => {
  try {
    const posts = await Users.getUserPosts(req.params.id);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: 'Error getting the posts for this user',
    });
  }
});

function upperCase(req, res, next) {

  const words_in_name = req.body.name.split(' ');
  const regex = /^[A-Z]/;
  let uppercase = true;
  words_in_name.map(word => {
    if (!regex.test(word)) uppercase = false;
  })

  if (uppercase) {
    next();
  } else {
    res.status(401).json({
      message: 'User\'s name is not uppercased',
    });
  }
}

module.exports = router;
