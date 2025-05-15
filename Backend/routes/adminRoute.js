
const Admin = require('../models/Admin');
const { verifyTokenAdmin } = require('./middlewares/verifyToken');
const router = require('express').Router();


// UPDATE ADMIN
router.put('/update', verifyTokenAdmin, async (req, res) => {

    if (req.body.password) {

        // Encrypt password again 'lkdshlkjsdhvhsdfjds'
        const encodedPassword = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_KEY).toString();
        req.body.password = encodedPassword;
    }

    try {
        const updatedAdmin = await Admin.findByIdAndUpdate(
            req.id,
            { $set: req.body },
            { new: true }
        );

        // Destructure admin object to hide password
        const { password, ...others } = updatedAdmin._doc;

        res.status(200).json(others, {message: "Admin updated Successfully !"});  // send to client updated Admin

    } catch (error) {
        res.status(500).json({message:'Failed to update admin'});
    }
});

// UPDATE ADMIN
router.put('/update/:id', verifyTokenAdmin, async (req, res) => {
    if (req.body.password) {
        const encodedPassword = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_KEY).toString();
        req.body.password = encodedPassword;
    }

    try {
        const updatedAdmin = await Admin.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true } // Ensure validators are applied
        );

        if (!updatedAdmin) {
            return res.status(404).json({ message: "User not found" });
        }

        const { password, ...others } = updatedAdmin._doc;
        res.status(200).json(others, {message: 'Admin Updated Successfully !'});
    } catch (error) {
        res.status(500).json({ message: 'Failed to update admin !' || error.message});
    }
});

// DELETE ADMIN
router.delete('/delete/:id', verifyTokenAdmin, async (req, res) => {

    try {

        const deletedUser = await Admin.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedUser);

    } catch (error) {

        res.status(500).json({message: 'Failed to delete admin !' || error.message});

    }
});

// GET LOGGED IN ADMIN
router.get('/find', verifyTokenAdmin, async (req, res) => {
    try {
        
        const admin = await Admin.findById(req.id);
        const {password, ...others} = admin._doc;
        res.status(200).json(others, {message: 'Active Admins'});

    } catch (error) {
        
        res.status(500).json({message: 'Active admins not found !'});

    }
});

// GET ADMIN BY ID
router.get('/find/:id', verifyTokenAdmin, async (req, res) => {
    try {
        
        const admin = await Admin.findById(req.params.id);
        const {password, ...others} = admin._doc;
        res.status(200).json(others);

    } catch (error) {
        
        res.status(500).json({message: 'Admin not found !'});

    }
});


// GET ALL ADMIN
router.get('/findAll', verifyTokenAdmin, async (req, res) => {
    try {
        
        const allAdmin = await Admin.find();
        // const {password, ...others} = admin._doc;
        res.status(200).json(allAdmin);

    } catch (error) {
        
        res.status(500).json({message: 'Unable to fetch all Admins !'});

    }
});


module.exports = router;

