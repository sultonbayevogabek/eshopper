const router = require('express').Router()

router.get('/', async (req, res) => {
   res.render('cart', {
      title: 'Cart | E-Shopper',
      user: req.user
   })
})

module.exports = {
   path: '/cart',
   router
}