const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
      type: 'OAuth2',
      user: 'sultonbayevogabek@gmail.com',
      pass: 'Ogabek19991031',
      clientId: '561607131354-akoa8j65evt0jc5sv8a4oitq749mkfue.apps.googleusercontent.com',
      clientSecret: 'nhZxUPjM1XxNIT0T7BbeCN6s',
      refreshToken: '1//04PegwlytphteCgYIARAAGAQSNwF-L9Ir_2jgR4l2iAriNLFmaNwSFkJEYeC43hVKXZwvFXNT5xKtoB4xK6L8LT53Awax1pchXKw'
   }
})

module.exports = function (emailUser, emailSubject, html) {
   const mailOptions = {
      from: 'sultonbayevogabek@gmail.com',
      to: emailUser,
      subject: emailSubject,
      html
   }

   transporter.sendMail(mailOptions, function(err, data) {
      if (err) {
         console.log("Error " + err);
      }
   })
}