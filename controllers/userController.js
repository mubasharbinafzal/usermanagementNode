// controllers/userController.js
const userService = require('../services/userService');
const Joi = require('joi');
const userSchema = require('../validation/userSchema');

async function fetchUsersAndSave(req, res) {
  try {
    // Fetch users from JSONPlaceholder API
    const users = await userService.fetchUsersFromAPI();
    
    // Save users to MongoDB
    const savedUsers = await userService.saveUsersToDB(users);
    
    res.json(savedUsers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getAllUsers(req, res) { 
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getUserById(req, res) {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function createUser(req, res) {
  try {
    const userData = req.body;
    // Validate request body against the Joi schema
    const { error, value } = userSchema.validate(userData);
    if (error)  return res.status(400).json({ error: error.details[0].message });
      const user = await userService.createUser(userData);
      res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function updateUser(req, res) {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function deleteUser(req, res) {
  try {
    await userService.deleteUser(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  fetchUsersAndSave,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};