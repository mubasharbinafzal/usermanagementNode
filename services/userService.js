// services/userService.js
const axios = require('axios');
const User = require('../models/User');

async function fetchUsersFromAPI() {
  try {
    const response = await axios.get(process.env.USERS);
    const users = response.data; 
    return users;
  } catch (error) {
    throw error;
  }
}

async function saveUsersToDB(users) {
  try {
    const savedUsers = await User.insertMany(users);
    return savedUsers;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  return await User.find();
}

async function getUserById(id) { 
  try {
    return await User.findById(id);
  } catch (err) {
    throw new Error('id not found');
  }
}

async function createUser(userData) { 
  try {
    return await User.create(userData);
  } catch (err) {
    throw new Error('user not Created');
  }
}

async function updateUser(id, newData) {

  try {
    return await User.findByIdAndUpdate(id, newData, { new: true });
  } catch (err) {
    throw new Error('user not updated');
  } 
}

async function deleteUser(id) {
  try {
    return await User.findByIdAndDelete(id);
  } catch (err) {
    throw new Error('user id not found');
  } 
  
}

module.exports = {
  fetchUsersFromAPI,
  saveUsersToDB,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};