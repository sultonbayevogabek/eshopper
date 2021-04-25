const router = require('express').Router()

router.get('/', async (req, res) => {
   res.render('contact-us', {
      title: 'Contact | E-Shopper',
      user: req.user,
      path: '/contact-us'
   })
})

module.exports = {
   path: '/contact-us',
   router
}