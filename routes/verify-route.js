const router = require('express').Router()
const {verifyToken} = require('../modules/jwt')
const User = require('../models/user')

router.get('/:token', async (req, res) => {
   if (verifyToken(req.params.token) === req.cookies.email) {
      const {name, email, password} = req.cookies
      const user = new User({
         name, email, password
      })
      await user.save()
      res.clearCookie('name')
      res.clearCookie('email')
      res.clearCookie('password')
      res.cookie('token', req.params.token)
      res.redirect('/')
   }
})

module.exports = {
   path: '/verify',
   router
}