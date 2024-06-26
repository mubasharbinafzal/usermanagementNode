// routes/posts.js
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/fetchAndSave', postController.fetchPostsAndSave);
router.get('/:userId', postController.getPostsByUserId);
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.post('/', postController.createPost);
router.patch('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;
