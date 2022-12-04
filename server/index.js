require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-learnit.0vqwupy.mongodb.net/?retryWrites=true&w=majority`,
      {
        useUnifiedTopology: true,
      }
    );

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDB();

const app = express();
app.use(express.json());
const port = 3030;

app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

app.listen(port, () => console.log(`Server started on port ${port}`));
