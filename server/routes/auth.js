const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const { json } = require('express')

// @route POST /api/auth/register
// @desc Register user
// @access Public
router.post('/register', async(req, res) => {
    const {username, password} = req.body

    // Validate input
    if (!username || !password) {
        return res
          .status(400)
          .json({
            success: false,
            message: 'Both username and password are required'
          })
    }

    try {
        // Check existing username
        const user = await User.findOne({ username })
        if (user) {
            return res
              .status(400)
              .json({
                sucess: false,
                message: 'Username already existed'
              })
        }

        // Hash password
        const hashedPassword = await argon2.hash(password)
        const newUser = new User({
            username,
            password: hashedPassword
        })
        await newUser.save()

        // Return token
        const accessToken = jwt.sign(
            {userId: newUser._id},
            process.env.ACCESS_TOKEN_SECRET
        )
        res.json({
            success: true,
            message: 'Registered successfully',
            accessToken
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
})

// @route POST /api/auth/login
// @desc Log in
// @access Public
router.post('/login', async(req, res) => {
    const {username, password} = req.body

    if (!username || !password) {
        return res
          .status(400)
          .json({
            success: false,
            message: 'Both username and password are required'
          })
    }

    try {
        // Check existing user
        const user = await User.findOne({ username })
        if (!user) {
            return res
              .status(400)
              .json({
                success: false,
                message: 'Incorrect username or password'
              })
        }

        // Validate password
        const passwordValid = await argon2.verify(user.password, password)
        if (!passwordValid) {
            return res
              .status(400)
              .json({
                success: false,
                message: 'Incorrect password or password'
              })
        }

        // Return token
        const accessToken = jwt.sign(
          {userId: user._id},
          process.env.ACCESS_TOKEN_SECRET
        )

        res.json({
          success: true,
          message: 'Logged in successfully',
          accessToken
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
})

module.exports = router