const router = require('express').Router()
const {dontEnterIfUser} = require('../middlewares/auth-middleware')
const Joi = require('joi')
const User = require('../models/user')
const {compareHash} = require('../modules/bcrypt')
const {generateToken} = require('../modules/jwt')

const loginSchema = Joi.object({
   email: Joi.string()
      .email({minDomainSegments: 2, tlds: {allow: ['com', 'net', 'ru', 'uz', 'net']}})
      .message('"Email" is not valid')
      .required(),
   password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .message('The password cannot be less than 5 characters')
      .min(5)
      .max(20)
      .required()
})

router.get('/', dontEnterIfUser, async (req, res) => {
   res.render('login', {
      title: 'Login or sign up',
      path: '/login'
   })
})

router.post('/', dontEnterIfUser, async (req, res) => {
   try {
      const validData = loginSchema.validate(req.body)
      if (validData.error) throw validData.error.details[0].message
      const {email, password} = validData.value
      const candidate = await User.findOne({ email })
      if(!candidate) throw 'User not found by this email'
      const isPasswordCorrect = compareHash(password, candidate.password)
      if (!isPasswordCorrect) throw 'Password is incorrect'
      res.cookie('token', generateToken(email)).redirect('/')
      res.clearCookie('name')
      res.clearCookie('email')
      res.clearCookie('password')
   } catch (e) {
      res.render('login', {
         title: 'Login or sign up',
         path: '/login',
         error: e + ''
      })
   }
})

module.exports = {
   path: '/login',
   router
}