
const express = require('express');

const postRouter = express.Router();

const postController = require('../controllers/post.controller');

const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

postRouter.post('', upload.single('image'), postController.createPostController);

postRouter.get('', postController.getAllPostsController);

postRouter.get('/details/:postId', postController.getPostDetailsController);
module.exports = postRouter;