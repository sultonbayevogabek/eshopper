const router = require('express').Router()

router.get('/', async (req, res) => {
   res.render('checkout', {
      title: 'Checkout | E-Shopper'
   })
})

module.exports = {
   path: '/checkout',
   router
}