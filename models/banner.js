const {Schema, model} = require('mongoose')

const bannerSchema = new Schema({
   title: String,
   subtitle: String,
   description: String,
   img: String,
   img_price: String
}, {collection: 'banner'})

module.exports = model('Banner', bannerSchema)