const router = require('express').Router()
const Product = require('../models/products')

router.get('/', async (req, res) => {
   const products = await Product.find().select({_v: 0})

   res.render('products', {
      title: 'Products | E-Shopper',
      user: req.user,
      path: '/products',
      products
   })
})

module.exports = {
   path: '/products',
   router
}