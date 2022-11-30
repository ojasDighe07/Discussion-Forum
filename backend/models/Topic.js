const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, default: "No Description" },
    followers: { type: Number, default: 0 }
},
    { timestamps: true }
);
const Topic = mongoose.model("Topic", TopicSchema);
module.exports = Topic