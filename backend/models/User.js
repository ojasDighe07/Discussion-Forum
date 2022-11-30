const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    following: [{type: mongoose.Schema.Types.ObjectId,ref : 'Topic',unique:false}]
},
    { timestamps: true }
);
const User = mongoose.model("User",UserSchema);
module.exports = User