const express = require('express')
const router = express.Router
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const Post = require('../models/Post')

// @route POST /api/posts
// @desc Create posts
// @access Private
router.post('/', async(req, res) => {
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
        
    }
})