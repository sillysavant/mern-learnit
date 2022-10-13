require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const authRouter = require('./routes/auth')

const connectDB = async() => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-learnit.0vqwupy.mongodb.net/?retryWrites=true&w=majority`, {
            useUnifiedTopology: true
        })

        console.log('MongoDB connected')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

connectDB()

const app = express()
const port = 3000

app.use(express.json())

app.use('/api/auth', authRouter)

app.listen(port, () => console.log(`Server started on port ${port}`))