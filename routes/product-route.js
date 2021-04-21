const router = require('express').Router()

router.get('/', async (req, res) => {
   res.render('products', {
      title: 'Products | E-Shopper'
   })
})

module.exports = {
   path: '/products',
   router
}