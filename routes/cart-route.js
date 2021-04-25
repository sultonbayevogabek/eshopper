const router = require('express').Router()
const {dontEnterIfNotUser} = require('../middlewares/auth-middleware')
const User = require('../models/user')

router.get('/', dontEnterIfNotUser, async (req, res) => {
   res.render('cart', {
      title: 'Cart | E-Shopper',
      user: req.user,
      path: '/cart'
   })
})

router.post('/add', async (req, res) => {
   const {productId} = req.body
   try {
      let userCart = await User.findById(req.user.id).cart
      console.log(userCart)
      if (!userCart) {
         userCart = []
         userCart.push({
            count: 1,
            productId
         })
         await User.findByIdAndUpdate(req.user.id, {
            cart: userCart
         })
         return res.send({
            ok: true
         })
      }

      const product = userCart.find(p => p.id === productId)

      if (!product) {
         userCart.push({
            count: 1,
            productId
         })
         await User.findByIdAndUpdate(req.user.id, {
            cart: userCart
         })
         return res.send({
            ok: true
         })
      }
   } catch (e) {
      console.log(e)
   }
})

module.exports = {
   path: '/cart',
   router
}