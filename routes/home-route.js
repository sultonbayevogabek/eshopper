const router = require('express').Router()
const Banner = require('../models/banner')
const Product = require('../models/products')

router.get('/', async (req, res) => {
   const banner = await Banner.find().select({_v: 0})
   const products = await Product.find().select({_v: 0})
   res.render('index', {
      title: 'E-Shopper',
      user: req.user,
      banner,
      products,
      path: '/'
   })
})

module.exports = {
   path: '/',
   router
}