const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema ({
    username: {type: String},
    password: {type: String},
    messages: {type: Array}
});

const User = mongoose.model('User', userSchema);
module.exports = User;