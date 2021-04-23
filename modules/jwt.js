const {sign, verify} = require('jsonwebtoken')

const generateToken = data => sign(data, '#^xSr8VQTGJvZ42p')

const verifyToken = token => verify(token, '#^xSr8VQTGJvZ42p')

module.exports = { generateToken, verifyToken }