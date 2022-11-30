const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, () => {
  console.log("DB Connected");
});
// mongodb+srv://ojasDb:Ojas070301@cluster0.icyefwq.mongodb.net/ForumApp?retryWrites=true&w=majority
const userRoute = require("./routes/userRoutes");
const threadRoute = require("./routes/threadRoutes");
const commentRoute = require("./routes/commentRoutes");
const topicRoute = require("./routes/topicRoutes");

const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use("/api/user", userRoute);
app.use("/api/thread", threadRoute);
app.use("/api/comment", commentRoute);
app.use("/api/topic", topicRoute);

// app.use(express.static(path.join(__dirname, "/frontend")));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
// });

app.listen(process.env.PORT || 5000, () => {
  console.log("Server Connected");
});
