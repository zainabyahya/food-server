const dotenv = require('dotenv');
dotenv.config();

const path = require("path");
const express = require('express');
const app = express();
const cors = require('cors');

const connectDB = require("./database.js");
connectDB();

const blogRoutes = require("./blog/blog.routes.js");
const authRoutes = require("./auth/auth.routes.js");
const CommentRoutes = require("./comments/comment.routes.js");

app.use(express.json())
app.use("/blog", blogRoutes);
app.use("/auth", authRoutes);
app.use("/comments", CommentRoutes);


const staticPath = path.join(path.dirname(""), "static/images");


app.use("/images", express.static(staticPath));

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.use('*', (req, res) => {
  res.status(404).json({ "message": "Page does not exist. Try again!" });
});

const port = 8000;
app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});