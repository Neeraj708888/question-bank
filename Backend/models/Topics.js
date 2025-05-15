// Topic Model
const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    desc: { type: String },
},
    { timestamps: true }
);

module.exports = mongoose.model('Topics', topicSchema);
