// question.js file

const Question = require('../models/Question');
const { verifyTokenAdmin } = require('./middlewares/verifyToken');

const router = require('express').Router();

// CREATE QUESTION AND ANSWER
router.post('/', async (req, res) => {
  try {
    const { question, answer, topicId } = req.body;
    
    const newQuestion = new Question({ 
        question, 
        answer, 
        topicId });
    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (error) {
    res.status(400).json({ message: 'Failed to Create Questions ! '|| error.message });
  }
});


// GET ALL QUESTION AND ANSWER
router.get('/', async (req, res) => {
    try {
        const {topicId} = req.query; // Get topic from query Params

        // If topicID provided, filter by topic id
        if (topicId) {
            const questions = await Question.find({ topicId });
            return res.status(200).json(questions);
        }

        // if No topic Id provided, all question
        
        const questions = await Question.find();
        res.status(201).json(questions);

    } catch (error) {
        res.status(500).json(error);
    }
});


// Corrected Backend Route (routes/question.js)
router.put('/', verifyTokenAdmin, async (req, res) => {
    try {
        const { topicId, _id } = req.query; // Getting topicId and question _id from query parameters

        if (!topicId || !_id) {
            return res.status(400).json('Topic ID and Question ID are required.');
        }

        const updatedQuestion = await Question.findOneAndUpdate(
            { _id: _id, topicId: topicId }, // Match by both question ID and topic ID
            { $set: req.body },
            { new: true }
        );

        if (!updatedQuestion) {
            return res.status(404).json('Question not found !');
        }

        res.status(200).json(updatedQuestion);

    } catch (error) {
        res.status(500).json(error.message || 'Failed to update question.');
    }
});


// DELETE QUESTION AND ANSWER
router.delete('/:id', verifyTokenAdmin, async (req, res) => {

    try {
        
        const deletedQuestion = await Question.findByIdAndDelete(req.params.id);   // question id from url

        if (!deletedQuestion) {
            return res.status(404).json('Question not found !');
        }

        res.status(201).json(deletedQuestion);

    } catch (error) {

        res.status(500).json(error)
    }
});


module.exports = router;