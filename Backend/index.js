// index.js
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');  // mongoose library of MongoDB
const cors = require('cors');
const authAdminRegisterRoute = require('./routes/authAdminRegisterRoute');
const adminRoute = require('./routes/adminRoute');
const topicRoute = require('./routes/topicRoute');
const questionRoute = require('./routes/questionRoute');




app.use(cors({
    origin: process.env.FRONTEND_URL || "https://question-bank-frontend-navy.vercel.app",  // your frontend PORT or All Ports using * 
    credentials: true
})); 
app.use(express.json()); // convert the incoming JS object into JSON without using it value is undefined 

// CONNECT DATABASE
mongoose.connect(process.env.MONGODB_URI).then(()=> console.log('Database connection successfully !')
).catch((err) => {
    console.log(err);
})

// calling our routes
app.use('/api/auth', authAdminRegisterRoute);
app.use('/api/admin', adminRoute);
app.use('/api/topics', topicRoute);
app.use('/api/question', questionRoute);

app.listen(process.env.PORT || 5000, ()=> {
    console.log('Backend server is running on Port 5000');
});
