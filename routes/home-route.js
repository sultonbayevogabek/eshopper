const router = require('express').Router()

router.get('/', async (req, res) => {
   res.render('index', {
      title: 'E-Shopper',
      user: req.user
   })
})

module.exports = {
   path: '/',
   router
}