const express = require("express");
const router = express.Router();

const postController = require('../controllers/postController')

router.route('/')
    .post(postController.createPost)
    .get(postController.fetchTimeline)

router.route('/:id')
    .put(postController.updatePost)
    .delete(postController.deletePost)
    .get(postController.fetchPost)

router.route('/:id/like')
    .put(postController.likePost)

module.exports = router;