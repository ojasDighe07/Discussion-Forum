const router = require('express').Router();
const { default: mongoose } = require('mongoose');
const Thread = require("../models/Thread");
const Topic = require("../models/Topic");

router.post("/add", async (req, res) => {
    req.body.user = mongoose.Types.ObjectId(req.body.user)
    try {
        const topic = await Topic.findOne({ name: req.body.topic });
        req.body.topic = topic._id;
        const newThread = new Thread(req.body);
        const savedThread = await Thread.create(newThread);
        res.status(200).json(savedThread);
    } catch (err) {
        res.status(500).json(err);
    }
});
router.get("/", async (req, res) => {
    try {
        const threads = await Thread.find().populate("topic").populate("user");
        res.status(200).json(threads);
    } catch (error) {
        res.status(500).json(error);
    }
});
//Get Thread By ID
router.get("/byId/:id", async (req, res) => {
    try {
        const thread = await Thread.findById(req.params.id).populate("topic").populate("user");
        res.status(200).json(thread);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Get Threads with TopicId
router.get("/byTopicId/:id", async (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id)
    try {
        const threads = await Thread.find({ topic: id }).populate("user").populate("topic", "name");
        res.status(200).json(threads);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
});

router.get("/byUserId/:id", async (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id)
    try {
        const threads = await Thread.find({ user: id }).populate("user").populate("topic", "name");
        res.status(200).json(threads);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
})
router.get("/one", async (req, res) => {
    try {
        const thread = await Thread.findOne();
        res.status(200).json(thread);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/trending", async (req, res) => {
    try {
        const threads = await Thread.find().populate("topic","name").populate("user","name");
        const limitThreads= threads.sort((thread1, thread2) => (thread2.comments - thread1.comments)).slice(0, 9);
        res.status(200).json(limitThreads);
    } catch (error) {
         res.status(500).json(error);
    }
})
module.exports = router;
// .limit(10);