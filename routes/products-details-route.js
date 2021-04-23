const router = require('express').Router()

router.get('/', async (req, res) => {
   res.render('product-details', {
      title: 'Product details | E-Shopper',
      user: req.user
   })
})

module.exports = {
   path: '/product-details',
   router
}