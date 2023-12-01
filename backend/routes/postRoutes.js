const express = require('express');
const router = express.Router();
const { createPostValidations, createCommentValidations } = require('../validator/postValidation');
const { createPost, getAllPosts, getSinglePost, createComment, getMyselfPosts } = require('../controller/postController');
const checkAuth = require('../middleware/checkAuth');

router.post('/create-post', checkAuth, createPostValidations, createPost); // User's Post Creation
router.get('/posts', getAllPosts);  // Get All Posts
router.get('/post/:id', getSinglePost);  // Get Single Post
router.post('/create-comment/:id', checkAuth, createCommentValidations, createComment); // User's Comment
router.get('/me/posts', checkAuth, getMyselfPosts); // Get Myself Posts

module.exports = router;