"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = exports.generateAccessToken = void 0;
const jwt = require('jsonwebtoken');
const somethin = require('crypto').randomBytes(64).toString('hex');
// '09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611'
const dotenv = require('dotenv');
// get config vars
dotenv.config();
const generateAccessToken = async (username) => {
    const token = await jwt.sign(username, process.env.TOKEN_SECRET);
    return token;
};
exports.generateAccessToken = generateAccessToken;
// next needs to be refactored !!!!
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null)
        return 'authenticateToken func didnt go through!';
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        console.log(err);
        if (err)
            return 'authenticateToken func didnt go through 2!';
        req.user = user;
        next();
    });
};
exports.authenticateToken = authenticateToken;