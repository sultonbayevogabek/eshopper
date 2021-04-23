module.exports = async (req, res, next) => {
   if (req.user) {
      res.redirect('/')
   }
   next()
}