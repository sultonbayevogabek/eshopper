const router = require('express').Router()

router.get('/', async (req, res) => {
   res.render('index', {
      title: 'E-Shopper'
   })
})

module.exports = {
   path: '/',
   router
}