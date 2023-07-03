const Post = require('../models/Post.model');
const User = require("../models/User.model");

exports.createPost = async(req, res, next) => {
    const newPost = new Post(req.body)

    try {
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)

    } catch (err) {
        res.status(500).json(err)
    }
}

exports.updatePost = async(req, res, next) => {
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
}

exports.deletePost = async(req, res, next) => {
    try {
        const post = await Post.findById(req.params.id)

        if (post.userID === req.body.userID) {
            await post.deleteOne()
            res.status(200).json('POST DELETED')
        }

    } catch (err) {
        res.status(500).json(err)
    }
}

exports.fetchPost = async(req, res, next) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)

    } catch (err) {
        res.status(500).json(err)
    }
}

exports.likePost = async(req, res, next) => {
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
}

exports.fetchTimeline = async(req, res, next) => {
    const postsArray = []
    try {
        const currentUser = await User.findById(req.body.userID)
        const userPosts = await Post.find({ userID: currentUser._id })
        // Promise.all() is called with the array of Promises. It takes an array of Promises and returns a new Promise that is fulfilled with an array of the resolved values of all the input Promises. In this case, it waits for all the Post.find() Promises to resolve and returns an array (friendPosts) containing all the post results.
        const friendPosts = await Promise.all(
            currentUser.following.map((friendID) => {
                return Post.find({ userID: friendID })
            })
        )
        res.json(userPosts.concat(...friendPosts))

    } catch (err) {
        res.status(500).json(err)
    }
}