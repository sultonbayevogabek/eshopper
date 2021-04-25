const router = require('express').Router()
const {dontEnterIfNotUser} = require('../middlewares/auth-middleware')

router.get('/', dontEnterIfNotUser, async (req, res) => {
   res.render('cart', {
      title: 'Cart | E-Shopper',
      user: req.user,
      path: '/cart'
   })
})

module.exports = {
   path: '/cart',
   router
}