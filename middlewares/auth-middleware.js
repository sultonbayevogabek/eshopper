async function dontEnterIfUser (req, res, next) {
   if (req.user) {
      return res.redirect('/')
   }
   next()
}

async function dontEnterIfNotUser (req, res, next) {
   if (!req.user) {
      return res.redirect('/login')
   }
   next()
}

module.exports = {dontEnterIfUser, dontEnterIfNotUser}