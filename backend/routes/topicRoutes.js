const router = require('express').Router();
const Topic = require("../models/Topic");

router.post("/add", async (req, res) => {
    console.log(req.body)
    const topic = {
        name: req.body.topic
    }
    
    try {
        const findTopic = await Topic.findOne({ name: topic.name });
        if (findTopic === null) {
            const newTopic = new Topic(topic);
            const savedTopic = await Topic.create(newTopic);
            res.status(200).json(savedTopic)
        }
        else 
        res.status(200).json(findTopic);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/", async (req, res) => {
    try {
        const topics = await Topic.find()
        const limitTopic = topics.slice(0, 5);
        res.status(200).json(limitTopic);
    } catch (error) {
        res.status(500).json(error)
    }
});
router.get("/byId/:id", async (req, res) => {
    try {
        const topic = await Topic.findById(req.params.id);
        res.status(200).json(topic);
    } catch (error) {
        res.status(500).json(error)
    }
});
router.get("/byName/:id", async (req, res) => {
    try {
        const topic = await Topic.findOne({name:req.params.id});
        res.status(200).json(topic);
    } catch (error) {
        res.status(500).json(error)
    }
});

// router.get("/user/:id", async (req, res) => {
//     try {
//         const topics = await Topic.find({ user: req.params.id });
//         res.status(200).json(topics);
//     } catch (error) {
//         res.status(500).json(err);
//     }
// })

module.exports = router;