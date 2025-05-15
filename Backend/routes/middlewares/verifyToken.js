// Middleware to verify Token

const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Get token from headers
    const authToken = req.headers.authorization;   // Get Token from headers from my frontend

    // const authToken = req.cookies.authorization;    // 1. Get token from cookies (not headers!)
    
    // 'Bearer xcsagajldhajdhsahdsa'
    if (!authToken) return res.status(401).json("Token is missing. Login again.");

        const token = authToken.split(" ")[1];      // 'xcsagajldhajdhsahdsa'

        jwt.verify(token, process.env.JWT_SEC_KEY, (err, obj) => {
            if (err) {
                return res.status(403).json('You are not authenticated !')
            } else {
                req.id = obj.id;            // return and store id from token
                req.isAdmin = obj.isAdmin;  // return and store isAdmin from token
                next();                     // go to the next middleware or route
            }
        });
    }


 // Middleware to verify Admin authorization
 const verifyTokenAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.isAdmin) {
            next();
        } else {
            res.status(403).json('You are not authorized ! ');
        }
    })
};

module.exports = { 
    verifyToken, 
    verifyTokenAdmin
 };