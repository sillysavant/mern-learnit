const express = require('express')
const router = express.Router
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const Post = require('../models/Post')
const verifyToken = require('../middleware/auth')

// @route POST /api/posts
// @desc Create posts
// @access Private
router.post('/', verifyToken, async(req, res) => {
    const {title, description, url, status} = req.body

    // Check title
    if (!title) {
        return res
          .status(400)
          .json({
            success: false,
            message: 'Title is required'
          })
    }

    try {
        const newPost = await Post.create({
            title,
            description,
            url: url.startsWith('https://') ? url : `https:${url}`,
            status: status || 'TO LEARN',
            user: req.userId
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
})

// @router GET /api/posts
// @desc Read posts
// @access Private
router.get('/', verifyToken, async(req, res) => {
    try {
        const posts = await Post.find({user: req.userId}).populate('user', [
            'username'
        ])
        
        res.json({success: true, posts})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
})

// @router PUT /api/posts
// @desc Update posts
// @access Private
router.put('/:id', verifyToken, async(req, res) => {
    const {title, description, url, status} = req.body

    // Validate title
    if (!title) {
        return res
          .status(400)
          .json({
            success: false,
            message: 'Title is required'
          })
    }

    try {
        let updatedPost = {
            title,
            description: description || '',
            url: (url.startsWith('https://') ? url : `https://${url}`) || '',
            status: status || 'TO LEARN'
        }

        const postUpdateCondition = {_id: req.params.id, user: req.userId}

        updatedPost = await Post.findOneAndUpdate(
            postUpdateCondition,
            updatedPost,
            {new: true}
        )

        // Validate authorization
        if (!updatedPost) {
            return res
              .status(401)
              .json({
                success: false,
                message: 'Unauthorised user or post not found'
              })
        }

        res.json({success: true, message: 'Excellent progress', updatedPost})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
})

module.exports = router