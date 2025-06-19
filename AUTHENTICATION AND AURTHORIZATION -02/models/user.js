const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/loginSystem');


const userSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    age: Number
});

module.exports = mongoose.model('User', userSchema);