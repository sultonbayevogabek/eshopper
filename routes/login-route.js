const router = require('express').Router()

router.get('/', async (req, res) => {
   res.render('login', {
      title: 'Login or sign up'
   })
})

module.exports = {
   path: '/login',
   router
}