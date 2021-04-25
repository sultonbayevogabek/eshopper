const router = require('express').Router()

router.get('/', async (req, res) => {
   res.render('products', {
      title: 'Products | E-Shopper',
      user: req.user,
      path: '/products'
   })
})

module.exports = {
   path: '/products',
   router
}