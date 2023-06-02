const express = require("express");
const router = express.Router();
const Post = require('../models/Post.model');
const User = require("../models/User.model");

//CREATE POST
router.post('/post', async (req, res, next) => {
    const newPost = new Post(req.body)

    try {
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)

    } catch (err) {
        res.status(500).json(err)
    }
})

//UPDATE POST
router.put('/post/:id/update', async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post.userID === req.body.userID) {
            await post.updateOne({ $set: req.body })
            res.status(200).json(post)
        } else {
            res.status(403).json('YOU CAN UPDATE ONLY YOUR POSTS')
        }

    } catch (err) {
        res.status(500).json(err)
    }
})

//DELETE POST
router.delete('/post/:id/delete', async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id)

        if (post.userID === req.body.userID) {
            await post.deleteOne()
            res.status(200).json('POST DELETED')
        }

    } catch (err) {
        res.status(500).json(err)
    }
})

//LIKE / DISLIKE POST
router.put('/post/:id/like', async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post.likes.includes(req.body.userID)) {
            await post.updateOne({ $push: { likes: req.body.userID } })
            res.status(200).json('LIKED!')
        } else {
            await post.updateOne({ $pull: { likes: req.body.userID } })
            res.status(200).json('DISLIKED!')
        }

    } catch (err) {
        res.status(500).json(err)
    }
})

//GET POST

router.get('/post/:id', async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)

    } catch (err) {
        res.status(500).json(err)
    }
})

//GET TIMELINE POSTS ONLY POSTS FROM USERS I FOLLOW
router.get('/posts', async (req, res, next) => {
    try {
        const posts = await Post.find()
        res.status(200).json(posts)

    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/timeline/all', async (req, res, next) => {
    const postsArray = []
    try {
        const currentUser = await User.findById(req.body.userID)
        const userPosts = await Post.find({ userID: currentUser._id })
        const friendPosts = await Promise.all(
            currentUser.following.map((friendID) => {
                return Post.find({ userID: friendID })
            })
        )
        res.json(userPosts.concat(...friendPosts))

    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;