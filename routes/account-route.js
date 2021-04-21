const router = require('express').Router()

router.get('/', async (req, res) => {
   res.render('account', {
      title: 'Account | E-Shopper'
   })
})

module.exports = {
   path: '/account',
   router
}