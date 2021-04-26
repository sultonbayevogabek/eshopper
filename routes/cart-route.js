const router = require('express').Router()
const {dontEnterIfNotUser} = require('../middlewares/auth-middleware')
const User = require('../models/user')
const Product = require('../models/products')

router.get('/', dontEnterIfNotUser, async (req, res) => {
   const user = await User.findById(req.user.id)
   const {cart, totalPrice} = user

   res.render('cart', {
      title: 'Cart | E-Shopper',
      user: req.user,
      path: '/cart',
      cart,
      totalPrice
   })
})

router.post('/add', async (req, res) => {
   const { id } = req.body
   try {
      const user = await User.findById(req.user.id)
      let {cart, totalPrice} = user


      const productIndex = cart.findIndex(p => p.productId.toString() === id.toString())
      const product = await Product.findById(id)

      if (productIndex === -1) {
         cart.push({
            productId: id,
            count: 1,
            price: product.price,
            title: product.title,
            img: product.img,
            totalPrice: product.price
         })
         totalPrice += product.price
         await User.findByIdAndUpdate(req.user.id, {
            cart, totalPrice
         })
         return res.send({ ok: true })
      }

      cart[productIndex].count = cart[productIndex].count + 1
      cart[productIndex].totalPrice += product.price
      totalPrice += product.price

      await User.findByIdAndUpdate(req.user.id, {
         cart, totalPrice
      })
      return res.send({ ok: true })
   } catch (e) {
      console.log(e)
   }
})

router.delete('/remove/:id', async (req, res) => {
   const id = req.params.id
   console.log(id)
   try {
      const user = await User.findById(req.user.id)
      let {cart, totalPrice} = user
      const productIndex = cart.findIndex(p => p._id.toString() === id)
      totalPrice -= cart[productIndex].totalPrice
      cart.splice(productIndex, 1)
      await User.findByIdAndUpdate(req.user.id, {cart, totalPrice})
      return res.send({ ok: true })
   } catch (e) {
      console.log(e)
   }
})

router.post('/increment', async (req, res) => {
   const id = req.body.id
   try {
      const user = await User.findById(req.user.id)
      let {cart, totalPrice} = user
      const productIndex = cart.findIndex(p => p._id.toString() === id)
      cart[productIndex].count = cart[productIndex].count + 1
      cart[productIndex].totalPrice = cart[productIndex].totalPrice + cart[productIndex].price
      totalPrice += cart[productIndex].price
      await User.findByIdAndUpdate(req.user.id, {
         cart, totalPrice
      })
      return res.send({ok: true})
   } catch (e) {
      console.log(e)
   }
})

router.post('/decrement', async (req, res) => {
   const id = req.body.id
   try {
      const user = await User.findById(req.user.id)
      let {cart, totalPrice} = user
      const productIndex = cart.findIndex(p => p._id.toString() === id)
      console.log(productIndex)

      if (cart[productIndex].count === 1) {
         totalPrice -= cart[productIndex].price
         cart.splice(productIndex, 1)
         await User.findByIdAndUpdate(req.user.id, {
            cart, totalPrice
         })
         return res.send({ ok: true })
      }
      cart[productIndex].count = cart[productIndex].count - 1
      cart[productIndex].totalPrice = cart[productIndex].totalPrice - cart[productIndex].price
      totalPrice -= cart[productIndex].price
      await User.findByIdAndUpdate(req.user.id, {
         cart, totalPrice
      })
      return res.send({ok: true})
   } catch (e) {
      console.log(e)
   }
})

module.exports = {
   path: '/cart',
   router
}