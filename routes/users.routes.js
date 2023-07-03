const router = require('express').Router()
//const User = require('../models/User.model')
//const bcrypt = require("bcrypt")

//We import the controller where we keep our logic for the http requests
//const userController = require('../controllers/userController')
//UPDATE USER
//router.route('/:id').put(updateUser)

const userController = require('../controllers/userController')

// const updateUser = async(req, res, next) => {
//     if (req.body.userID === req.params.id || req.body.isAdmin) {
//         //if user tries to update password we must create a password again
//         if (req.body.password) {
//             try {
//                 const salt = await bcrypt.genSalt(10)
//                 req.body.password = await bcrypt.hash(req.body.password, salt)
//             } catch (err) {
//                 return res.status(500).json(err)
//             }
//         }
//         try {
//             const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body })
//             res.status(200).json(user)
//         } catch (err) {
//             return res.status(500).json('hi')
//         }

//     } else {
//         return res.status(403).json('You can only update your profile')
//     }
// }

// const deleteUser = async (req, res, next) => {
//     if (req.body.userID === req.params.id || req.body.isAdmin) {
//         try {
//             await User.findByIdAndDelete(req.params.id)
//             res.status(200).json('USER DELETED')
//         } catch (err) {
//             return res.status(500).json('COULD NOT DELEET USER')
//         }
//     } else {
//         return res.status(403).json('You can only delete your profile')
//     }

// }

// const getUser = async (req, res, next) => {
//     try {
//         console.log('THE USER ID IS:', req.params.id)
//         const user = await User.findById(req.params.id)
//         const { password, updatedAt, ...other } = user._doc
//         console.log(user)
//         res.status(200).json(other)
//     } catch (err) {
//         return res.status(500).json('COULD NOT FIND USER')
//     }
// }

//2nd router controller

// const followUser = async(req, res, next) => {

//     if (req.body.userID !== req.params.id) {
//         try {
//             const user = await User.findById(req.params.id)
//             const currentUser = await User.findById(req.body.userID)

//             if (!user.followers.includes(req.body.userID)) {
//                 await user.updateOne({ $push: { followers: req.body.userID } })
//                 await currentUser.updateOne({ $push: { following: req.params.id } })
//                 res.status(200).json('USER HAS BEEN FOLLOWED')

//             } else {
//                 res.status(403).json('YOU ALREADY FOLLOW THIS ACCOUNT')
//             }

//         } catch (err) {
//             return res.status(400).json('You could not follow this user')
//         }

//     } else {
//         res.status(403).json('YOU CANNOT FOLLOW YOURSELF')
//     }
// }

// const unfollowUser = async(req, res, next) => {
//     if (req.body.userID !== req.params.id) {
//         try {
//             const user = await User.findById(req.params.id)
//             const currentUser = await User.findById(req.body.userID)

//             if (user.followers.includes(req.body.userID)) {
//                 await user.updateOne({ $pull: { followers: req.body.userID } })
//                 await currentUser.updateOne({ $pull: { following: req.params.id } })
//                 res.status(200).json('ACCOUNT UNFOLLWED')
//             }

//         } catch (err) {
//             return res.status(400).json('NOT ABLE TO UNFOLLOW ACCOUNT')
//         }

//     } else {
//         res.status(403).json('YOU CANNOT UNFOLLOW YOURSELF')
//     }
// }

router
    .route('/:id')
    .put(userController.updateUser)
    .delete(userController.deleteUser)
    .get(userController.getUser)

router.route('/:id/follow')
    .put(userController.followUser)

router.route('/:id/unfollow')
    .put(userController.unfollowUser)

module.exports = router;