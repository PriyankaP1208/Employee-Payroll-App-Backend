const e = require('express');
const jwt = require('jsonwebtoken');

class Helper {
    generateAccessToken(data){
        return jwt.sign(data, process.env.TOKEN_SECRET);
    }
}

module.exports = new Helper();
