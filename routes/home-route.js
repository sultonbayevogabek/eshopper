const router = require('express').Router()
const Banner = require('../models/banner')

router.get('/', async (req, res) => {
   const banner = await Banner.find().select({_v: 0})
   res.render('index', {
      title: 'E-Shopper',
      user: req.user,
      banner,
      path: '/'
   })
})

module.exports = {
   path: '/',
   router
}