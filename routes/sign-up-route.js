const router = require('express').Router()
const Joi = require('joi')

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
      const validData = await signUpSchema.validateAsync(req.body)
   }
   catch (e) {
      console.log(e)
   }
})

module.exports = {
   path: '/signup',
   router
}