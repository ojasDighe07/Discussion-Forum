const router = require('express').Router();
const User = require("../models/User");
const Thread = require("../models/Thread");
const Topic = require("../models/Topic")
const { default: mongoose } = require('mongoose');
//add (register) user
router.post("/add", async (req, res) => {
    try {
        console.log("here")
        const findUser = await User.findOne({ username: req.body.username });
        if (findUser !== null) {
            console.log("bad request")
            res.status(500).json("Bad request")
        }
        else {
            const newUser = new User(req.body);
            const savedUser = await User.create(newUser);
            res.status(200).json(savedUser);
        }
        
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
});
//login user
router.post("/login", async (req, res) => {
    try {
        const findUser = await User.findOne({ username: req.body.username });
        if (findUser.password === req.body.password) {
            const { password, ...others } = findUser._doc;
            res.status(200).json(others);
        }
        else {
            res.status(500).json("Password Incorrect")
        }
    } catch (error) {
        res.status(500).json(error)
    }
});

//follow topic
router.put("/follow/:id", async (req, res) => {
    const topicId = mongoose.Types.ObjectId(req.params.id);
    // const userId = mongoose.Types.ObjectId(req.body.username);
    try {
        await User.updateOne({ _id: req.body._id }, { $push: { following: topicId } });
        await Topic.updateOne({ _id: topicId }, { $inc: { followers: 1 } });
        const updatedUser = await User.findById(req.body._id);
        res.status(200).json(updatedUser);

    } catch (error) {
        res.status(500).json(error);
    }
});
//unfollow topic
router.put("/unfollow/:id", async (req, res) => {
    const topicId = mongoose.Types.ObjectId(req.params.id);
    // const userId = mongoose.Types.ObjectId(req.body.username);
    console.log(topicId,req.body)
    try {
        await User.updateOne({ _id: req.body._id }, { $pull: { following: topicId } }, { new: true });
        await Topic.updateOne({ _id: topicId }, { $inc: { followers: -1 } });
        
    
        const updatedUser = await User.findById(req.body._id);
        res.status(200).json(updatedUser);

    } catch (error) {
        res.status(500).json(error);
    }
})
//get user
router.get("/", async (req, res) => {
    try {
        const users = await User.find().populate("following", "name");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(err);
    }
});
//get user by id
router.get("/byId/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate("following");
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(err);
    }
});
//get followed topics for user
router.get("/topics/:id", async (req, res) => {
    try {
        const { following } = await User.findById(req.params.id).populate("following");
        res.status(200).json(following);
    } catch (error) {
        res.status(500).json(error);
    }
});
// get feed for user
router.get("/feed/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const threads = await Thread.find({ topic:{$in:user.following} }).populate("topic","name").populate("user","name");
        res.status(200).json(threads);
    } catch (error) {
        res.status(500).json(error);
    }
})
module.exports = router;