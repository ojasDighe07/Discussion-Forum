const router = require('express').Router();
const { default: mongoose } = require('mongoose');
const Comment = require("../models/Comment");
const Thread = require('../models/Thread');

router.post("/add", async (req, res) => {
    req.body.user = mongoose.Types.ObjectId(req.body.user);
    req.body.thread = mongoose.Types.ObjectId(req.body.thread);
    try {
        const newComment = new Comment(req.body);
        const savedComment = await Comment.create(newComment);
        await Thread.findByIdAndUpdate(req.body.thread, { $inc: { comments: 1 } });
        res.status(200).json(savedComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/comments/:id", async (req, res) => {
    try {
        const comments = await Comment.find({ thread: req.params.id }).populate("user","name").populate("thread", "name").populate("parent", "description")
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/user/:id", async (req, res) => {
    try {
        const userComments = await Comment.find({ user: req.params.id }).populate("thread");
        res.status(200).json(userComments);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;