const router = require('express').Router()
const Joi = require('joi')
const sendEmail = require('../modules/email')
const User = require('../models/user')
const {generateToken} = require('../modules/jwt')
const {generateHash} = require('../modules/bcrypt')
const { dontEnterIfUser } = require('../middlewares/auth-middleware')

const signUpSchema = Joi.object({
   name: Joi.string()
      .min(3)
      .max(30)
      .message('The name must be at least 3 characters long and at most 30 characters long')
      .required(),
   email: Joi.string()
      .email({minDomainSegments: 2, tlds: {allow: ['com', 'net', 'ru', 'uz', 'net']}})
      .message('"Email" should be entered as: example@example.com')
      .required(),
   password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .message('The password must be at least 5 characters long')
      .min(5)
      .max(20)
      .required()
})


router.post('/', dontEnterIfUser, async (req, res) => {
   try {
      const validData = signUpSchema.validate(req.body)
      if (validData.error) {
         throw validData.error.details[0].message
      }
      const {name, email, password} = req.body
      const candidate = await User.findOne({email})
      if (candidate) throw 'This email already in use. Please login'

      const token = generateToken(email)

      res.cookie('name', name)
      res.cookie('email', email)
      res.cookie('password', generateHash(password))

      sendEmail(email, 'Eshopper | Verify account',
         `<div style="width: 100%; padding: 30px; background: #F0F0E9; color: #333;">
                  <div
                     style="width: 500px; background: white; border-radius: 5px; margin: 0 auto; padding: 15px 15px 50px; font-family: sans-serif;">
                     <header
                        style="padding-bottom: 15px; border-bottom: 1px solid #ccc; margin-bottom: 30px">
                        <img style="width: 100px; height: auto" src="https://demo.themeum.com/html/eshopper/images/home/logo.png"
                             alt="">
                        <h3 style="margin: 0; float: right; line-height: 32px; font-size: 22px; font-weight: 400">Hello, ${name}</h3>
                     </header>
                     <main>
                        <p style="margin-bottom: 30px; text-align: center">Click the button below to confirm the your account</p>
                        <a style="display: block; padding: 15px; background: dodgerblue; color: #fff; text-decoration: none; text-align: center; border-radius: 5px"
                           href="https://eshopper-uz.herokuapp.com/verify/${token}" target="_blank">Verify your account</a>
                     </main>
                  </div>
               </div>`
      )
      res.render('verify', {
         title: 'Verify your account',
         user: req.user
      })
   } catch (e) {
      res.render('login', {
         title: 'Login or sign up',
         error: e + '',
         user: req.user
      })
   }
})

module.exports = {
   path: '/signup',
   router
}