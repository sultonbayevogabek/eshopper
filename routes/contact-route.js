const router = require('express').Router()

router.get('/', async (req, res) => {
   res.render('contact-us', {
      title: 'Contact | E-Shopper'
   })
})

module.exports = {
   path: '/contact-us',
   router
}