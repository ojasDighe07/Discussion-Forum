const mongoose = require('mongoose');

const ThreadSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    topic: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic' },
    comments: { type: Number, default: 0 }
},
    { timestamps: true }
);

const Thread = mongoose.model("Thread", ThreadSchema);
module.exports = Thread