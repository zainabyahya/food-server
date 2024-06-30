const dotenv = require('dotenv');
dotenv.config();

const path = require("path");
const express = require('express');
const app = express();
const cors = require('cors');

const connectDB = require("./database.js");
connectDB();

const addressRoutes = require("./addresses/address.routes.js");
const authRoutes = require("./auth/auth.routes.js");
const blogRoutes = require("./blog/blog.routes.js");
const bookmarkRoutes = require("./bookmarks/bookmark.routes.js");
const commentRoutes = require("./comments/comment.routes.js");
const confirmationRoutes = require("./confirmations/confirmation.routes.js")
const chatroomRoutes = require("./chatrooms/chatroom.routes.js");
const foodRoutes = require("./foods/food.routes.js");
const messageRoutes = require("./messages/message.routes.js");
const userRoutes = require("./users/user.routes.js");
const errorHandling = require('./middlewares/errorHandling.js');

app.use(express.json());
app.use(cors());

app.use("/addresses", addressRoutes);
app.use("/auth", authRoutes);
app.use("/blogs", blogRoutes);
app.use("/bookmarks", bookmarkRoutes);
app.use("/chatrooms", chatroomRoutes);
app.use("/food", foodRoutes);
app.use("/comments", commentRoutes);
app.use("/confirmation", confirmationRoutes);
app.use("/messages", messageRoutes);
app.use("/users", userRoutes);

const staticPath = path.join(path.dirname(""), "static/images");
app.use("/images", express.static(staticPath));


app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.use('*', (req, res) => {
  res.status(404).json({ "message": "Page does not exist. Try again!" });
});

app.use(errorHandling)

const port = 8000;
app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});