// topic.js file

const Topics = require('../models/Topics');
const { route } = require('./authAdminRegisterRoute');
const { verifyTokenAdmin } = require('./middlewares/verifyToken');

const router = require('express').Router();


// CREATE TOPIC
router.post('/', verifyTokenAdmin,  async (req, res) => {

    try {

        const newTopic = new Topics(req.body);
        const savedTopic = await newTopic.save();
        res.status(200).json(savedTopic);


    } catch (error) {

        res.status(500).json({message: "Failed to create !"});

    }
});

// UPDATE TOPIC
router.put('/update/:id', verifyTokenAdmin, async (req, res) => {

    try {

        const updatedTopic = await Topics.findByIdAndUpdate(
            req.params.id,    
            { $set: req.body },
            { new: true }
        );

        if (!updatedTopic) {
            res.status(404).json('Please add topics !');
        }

        res.status(201).json(updatedTopic);
        
    } catch (error) {

        res.status(500).json({message: 'Topic already exists !' || error.message});
    }
});

// DELETE TOPIC
router.delete('/delete/:id', verifyTokenAdmin, async (req, res) => {

    try {
        
        const deletedTopic = await Topics.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedTopic);

    } catch (error) {
        res.status(500).json({message: 'Failed to delete Topic !' || error.message});
    }
});

// GET ALL TOPIC
router.get('/', async (req, res)=> {

    try {
        
        const getAlltopics = await Topics.find();
        res.status(201).json(getAlltopics);

    } catch (error) {

        res.status(500).json({message: 'Failed to fetch topics !' || error.message});
    }

});

module.exports = router;