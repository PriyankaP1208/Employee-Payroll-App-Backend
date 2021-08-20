<<<<<<< HEAD
//const express = require("express");
const jwt = require("jsonwebtoken");

class Helper {
	generateAccessToken(data){
		return jwt.sign(data, process.env.TOKEN_SECRET);
	}
=======
const e = require('express');
const jwt = require('jsonwebtoken');

class Helper {
    generateAccessToken(data){
        return jwt.sign(data, process.env.TOKEN_SECRET);
    }
>>>>>>> b027bc54fb2b5ea2d45793472191261c646dbc56
}

module.exports = new Helper();
