
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/miniproject');


const userSchema = mongoose.Schema({
    username: String,
    name: String,
    age: Number,
    email: String,
    password: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,ref: 'Post'
        }
    ]
       
});

module.exports = mongoose.model('User', userSchema);