const bcrypt = require('bcrypt')

const generateHash = data => bcrypt.hashSync(data, bcrypt.genSaltSync(10))

const compareHash = (data, token) => bcrypt.compareSync(data, token)

module.exports = {generateHash, compareHash}