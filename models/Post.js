const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const User = require('../models/User');

const PostSchema = new Schema({
    user: {type: Schema.ObjectId, ref: 'User', required: true},
    title: {type: String,  required: true},
    description: {type: String, required: true},
    creationdate: {type: Date, default: Date.now}
});

module.exports = model('Post', PostSchema);