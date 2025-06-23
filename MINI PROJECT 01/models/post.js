
const mongoose = require('mongoose');


const postSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    date: {
        type: Date,
        default: Date.now
    },

    content: String,
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    
});

module.exports = mongoose.model('post', postSchema);