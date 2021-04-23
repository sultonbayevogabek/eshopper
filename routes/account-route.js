const router = require('express').Router()

router.get('/', async (req, res) => {
   res.render('account', {
      title: 'Account | E-Shopper',
      user: req.user
   })
})

module.exports = {
   path: '/account',
   router
}