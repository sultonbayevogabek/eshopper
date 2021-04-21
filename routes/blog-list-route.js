const router = require('express').Router()

router.get('/', async (req, res) => {
   res.render('blog-list', {
      title: 'Blog list | E-Shopper'
   })
})

module.exports = {
   path: '/blog-list',
   router
}