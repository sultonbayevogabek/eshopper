const router = require('express').Router()
const Joi = require('joi')
const sendEmail = require('../modules/email')
const User = require('../models/user')
const {generateToken, verifyToken} = require('../modules/jwt')

const signUpSchema = Joi.object({
   name: Joi.string()
      .min(3)
      .max(30)
      .message('The name must be at least 3 characters long and at most 30 characters long')
      .required(),
   email: Joi.string()
      .email({minDomainSegments: 2, tlds: {allow: ['com', 'net', 'ru', 'uz', 'net']}})
      .message('Email should be entered as: example@example.com'),
   password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .message('The password must be at least 5 characters long')
})


router.post('/', async (req, res) => {
   try {
      const {name, email, password} = await signUpSchema.validateAsync(req.body)

      const candidate = await User.findOne({email})

      if (candidate) throw new Error('This email already in use')

      const user = new User({name, email, password})

      await user.save()

      sendEmail(email, 'Eshopper | Verify account',
         `<div style="width: 100%; padding: 30px; background: #F0F0E9; color: #333;">
                  <div
                     style="width: 500px; background: white; border-radius: 5px; margin: 0 auto; padding: 15px 15px 50px; font-family: sans-serif;">
                     <header
                        style="padding-bottom: 15px; border-bottom: 1px solid #ccc; margin-bottom: 50px">
                        <img style="width: 100px; height: auto" src="https://demo.themeum.com/html/eshopper/images/home/logo.png"
                             alt="">
                        <h3 style="margin: 0; float: right; line-height: 32px; font-size: 22px; font-weight: 400">Hello, ${name}</h3>
                     </header>
                     <main>
                        <p style="margin-bottom: 30px; text-align: center">Click the button below to confirm the your account</p>
                        <a style="display: block; padding: 15px; background: dodgerblue; color: #fff; text-decoration: none; text-align: center; border-radius: 5px"
                           href="#">Verify your account</a>
                     </main>
                  </div>
               </div>`
      )
   } catch (e) {
      res.render('login', {
         title: 'Login or sign up',
         error: e + ''
      })
   }
})

module.exports = {
   path: '/signup',
   router
}