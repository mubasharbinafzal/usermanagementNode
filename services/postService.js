// services/postService.js
const axios = require('axios');
const Post = require('../models/Post');

async function fetchPostsFromAPI() {
    try {
      const response = await axios.get(process.env.POSTS);
      const posts = response.data; 
      return posts;
    } catch (error) {
      throw error;
    }
  }
  
async function savePostsToDB(posts) {
  try {
    const savedPosts = await Post.insertMany(posts);
    return savedPosts;
  } catch (error) {
    throw error;
  }
}

const getPostsByUserId = async (userId) => {
  try {
    const posts = await Post.find({ userId: userId });
    return posts;
  } catch (err) {
    throw new Error('Could not fetch posts');
  }
};

async function getAllPosts() {
  
  try {
    return await Post.find();
  } catch (err) {
    throw new Error('some thing wen wrong');
  } 
}

async function getPostById(id) {
  
  try {
    return await Post.findById(id);
  } catch (err) {
    throw new Error('not found');
  } 
}

async function createPost(postData) {
  
  try {
    return await Post.create(postData);
  } catch (err) {
    throw new Error('something went wrong');
  } 
}

async function updatePost(id, newData) { 
  try {
    return await Post.findByIdAndUpdate(id, newData, { new: true });
  } catch (err) {
    throw new Error('not update');
  } 
}

async function deletePost(id) {
  try {
    return await Post.findByIdAndDelete(id);
  } catch (err) {
    throw new Error('id not found');
  } 
}

module.exports = {
  fetchPostsFromAPI,
  savePostsToDB,
  getPostsByUserId,
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
};