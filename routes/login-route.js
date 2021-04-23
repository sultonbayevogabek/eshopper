const router = require('express').Router()
const authMiddleware = require('../middlewares/auth-middleware')

router.get('/', authMiddleware, async (req, res) => {
   res.render('login', {
      title: 'Login or sign up',
      user: req.user
   })
})

module.exports = {
   path: '/login',
   router
}