// authRegister.js

const Admin = require('../models/Admin');
const router = require('express').Router();
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
// Register
router.post('/register', async (req, res) => {

    try {
        const { username, email, password } = req.body;
        // Validation: Check if all fields are provided
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if Admin already exists
        const existingAdmin = await Admin.findOne({
            $or: [
                { email: email.toLowerCase() },
                { username: username.toLowerCase() }
            ]
        });

        if (existingAdmin) {
            return res.status(409).json({ message: "Admin already registered. Please check username and email !" });
        }

        // Encrypt password
        // const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.PASS_KEY).toString();

        const admin = await Admin.create(
            {
                username: username.toLowerCase(),  // username
                email: email.toLowerCase(),   // email
                // password: req.body.password
                password: CryptoJS.AES.encrypt(password, process.env.PASS_KEY).toString(), // password
            }
        );

        // admin ko kar do save database mein
        // const savedAdmin = await admin.save();

        const { password: _, ...adminData } = admin._doc;   // return admin data excluding password
        console.log(admin);
        res.status(200).json({message: "Admin registered successfully.", admin: adminData});  // success if admin save ho chuka ho database mein

    } catch (error) {
        res.status(500).json({ message: 'username and password mismatch !' ||  error.message });
    }
});

// Login Admin

router.post('/login' , async (req, res) => {

    try {
        const admin = await Admin.findOne({ username: (req.body.username) });

        // Check if Admin exists
        if (!admin) {
            return res.status(401).json({ message: "Admin not found!" });
        }

        if (!admin.isAdmin) {
            return res.status(401).json({ message: 'Access denied for this Admin !' });
        }


        // Decrypt password stored in Database
        const hashedOriginalPassword = CryptoJS.AES.decrypt(admin.password, process.env.PASS_KEY);
        const originalPassword = hashedOriginalPassword.toString(CryptoJS.enc.Utf8);

        // Checks if password matches
        if (originalPassword !== req.body.password) {
            return res.status(401).json({ message: 'username and password mismatch !' });
        }

        
        // Destructure admin object to hide password
        const { password, ...others } = admin._doc;

        // Generate Token
        const token = jwt.sign(
            { id: admin.id, isAdmin: admin.isAdmin },  // payload
            process.env.JWT_SEC_KEY,  // Secret Key
            { expiresIn: "3d" }   // expires in 3 days
        );

        // Send final response with admin details and token   
        res.status(200).json({ message: 'Login Successfully !', ...others, token });  // send admin if everything is ok

    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
