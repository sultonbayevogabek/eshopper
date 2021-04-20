const router = require('express').Router()

router.get('/', async (req, res) => {
   res.render('account', {
      title: 'Account'
   })
})

module.exports = {
   path: '/account',
   router
}