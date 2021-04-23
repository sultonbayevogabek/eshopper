const User = require('../models/user')
const {verifyToken} = require('../modules/jwt')

module.exports = async (req, res, next) => {
   if (req.cookies.token) {
      const email = verifyToken(req.cookies.token)
      req.user = await User.findOne({email}).select({name: 1, email: 1})
   }
   next()
}