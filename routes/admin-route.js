const router = require('express').Router()
const {dontEnterIfUser} = require('../middlewares/auth-middleware')
const Product = require('../models/products')
const User = require('../models/user')


router.get('/', dontEnterIfUser, async (req, res) => {
   res.render('admin-login')
})

router.post('/', async (req, res) => {
   const {login, password} = req.body

   if (login === 'admin' && password === '12345') {
      const products = await Product.find()
      const users = await User.find()
      res.render('admin', {
         title: 'Admin page',
         products,
         users
      })
   } else {
      res.redirect('/')
   }
})

router.post('/photo', async (req, res) => {
   const {img, title, price} = req.body
   try {
      const newProduct = new Product({
         title, price, img
      })
      await newProduct.save()
      res.redirect('/products')
   } catch (e) {
      console.log(e)
   }
})

router.delete('/product/remove/:id', async (req, res) => {
   try {
      const id = req.params.id
      await Product.findByIdAndDelete(id)
      res.send({
         ok: true
      })
   } catch (e) {

   }
})

module.exports = {
   path: '/admin',
   router
}