// Question model

const mongoose = require('mongoose');


const questionSchema = new mongoose.Schema({

    topicId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
        required: true
    },
    question: { type: String, required: true },
    answer: { type: String, required: true },
}, { timestamps: true }
);

module.exports = mongoose.model('Question', questionSchema);

