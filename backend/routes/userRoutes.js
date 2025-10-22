const express = require('express');
const router = express.Router();
const User = require('../models/User');

const transformUser = (user) => ({
  id: user._id.toString(),
  ...user.toObject(),
  _id: undefined,
})

// GET route to retrieve all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(transformUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET route to retrieve a single user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(transformUser(user));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT route to update a user by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(transformUser(updatedUser));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE route to remove a user by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST route to create a user
router.post('/', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(transformUser(savedUser));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
