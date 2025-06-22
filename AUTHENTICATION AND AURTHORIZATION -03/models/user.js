const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1.27017/testing the database');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    age: Number,
    posts: Array,
})

module.exports = mongoose.model('User', userSchema);