// controllers/postController.js
const postService = require('../services/postService');
const Joi = require('joi');
const postSchema = require('../validation/postSchema');

async function fetchPostsAndSave(req, res) {
    try {
      // Fetch posts from JSONPlaceholder API
      const posts = await postService.fetchPostsFromAPI();
      
      // Save posts to MongoDB
      const savedPosts = await postService.savePostsToDB(posts);
      
      res.json(savedPosts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  const getPostsByUserId = async (req, res, next) => {
    const { userId } = req.params;
  
    try {
      const posts = await postService.getPostsByUserId(parseInt(userId));
      res.json(posts);
    } catch (err) {
      next(err);
    }
  };

async function getAllPosts(req, res) {
  try {
    const posts = await postService.getAllPosts();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getPostById(req, res) {
  try {
    const post = await postService.getPostById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function createPost(req, res) {
  try {
    const postData = req.body;
      // Validate request body against the Joi schema
    const { error, value } = postSchema.validate(postData);
    // Validation failed
    if (error)  return res.status(400).json({ error: error.details[0].message });

    const post = await postService.createPost(postData);
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function updatePost(req, res) {
  try {
    const updatedPost = await postService.updatePost(req.params.id, req.body);
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function deletePost(req, res) {
  try {
    await postService.deletePost(req.params.id);
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  fetchPostsAndSave,
  getPostsByUserId,
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
};
