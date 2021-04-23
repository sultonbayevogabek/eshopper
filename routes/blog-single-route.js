const router = require('express').Router()

router.get('/', async (req, res) => {
   res.render('blog-single', {
      title: 'Blog Single | E-Shopper',
      user: req.user
   })
})

module.exports = {
   path: '/blog-single',
   router
}