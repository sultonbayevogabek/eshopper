const fs = require('fs/promises')
const User = require('../models/user')
const path = require('path')
const router = require('express').Router()
const {dontEnterIfNotUser} = require('../middlewares/auth-middleware')
const upload = require('express-fileupload')
const Joi = require('joi')

const editInfoSchema = Joi.object({
   name: Joi.string()
      .required()
      .min(4)
      .max(30),
   phone: Joi.number()
      .required()
      .min(998600000000)
      .max(998999999999),
   email: Joi.string()
      .email({minDomainSegments: 2, tlds: {allow: ['com', 'net', 'ru', 'uz', 'net']}})
      .required(),
   address: Joi.string()
      .required()
      .min(5)
      .max(40),
   telegram: Joi.string()
      .min(3)
      .max(20)
      .required()
      .pattern(new RegExp('^@')),
   id: Joi.string()
      .required()
})

router.get('/', dontEnterIfNotUser, async (req, res) => {
   res.render('account', {
      title: 'Account | E-Shopper',
      user: req.user,
      path: '/account'
   })
})

router.get('/exit', dontEnterIfNotUser, async (req, res) => {
   res.clearCookie('token').redirect('/')
})

router.post('/photo', upload({size: (1024 * 10) * 1024}), async (req, res) => {
   try {
      await User.findByIdAndUpdate(req.user._id, {
         img: `avatars/${req.user._id}.jpg`
      })
      const photoPath = path.join(__dirname, "..", "public", "avatars", `${req.user._id}.jpg`)
      const fileStream = await fs.writeFile(photoPath, req.files.photo.data)

      res.send({
         ok: true
      })

   } catch (e) {
      res.send({
         ok: false
      })
   }
})

router.post('/edit', async (req, res) => {
   try {
      const userId = req.body.id
      const user = await User.findById(userId).select({password: 0})
      res.render('account-edit', {
         title: 'Edit user info',
         user
      })
   } catch (e) {
      console.log(e)
   }
})

router.post('/edited', async (req, res) => {
   try {
      const validData = editInfoSchema.validate(req.body)

      if (validData.error) throw validData.error.details[0].message

      const {name, phone, email, address, telegram, id} = validData.value

      await User.findByIdAndUpdate(id, {
         name, phone, email, address, telegram
      })

      res.redirect('/account')
   } catch (e) {
      res.render('account-edit', {
         title: 'Edit user info',
         user: req.user,
         error: e + ''
      })
   }
})

router.post('/delete', async (req, res) => {
   await fs.unlink(path.join(__dirname, '..', 'public', 'avatars', `${req.body.id}.jpg`))
   await User.findByIdAndDelete(req.body.id)
   res.clearCookie('token').redirect('/')
})

module.exports = {
   path: '/account',
   router
}