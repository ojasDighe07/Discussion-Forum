const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    description: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    thread: { type: mongoose.Schema.Types.ObjectId, ref: 'Thread', required: true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null },
    likes: { type: Number, default: 0 },
    
},
    { timestamps: true }
);
const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;