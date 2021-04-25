const {Schema, model} = require('mongoose')

const productSchema = new Schema({
   title: {
      type: String,
      required: true,
      minlength: 3
   },
   price: {
      type: Number,
      required: true,
      min: 1
   },
   img: {
      type: String,
      required: true,
      minlength: 10
   }
}, {collection: 'products'})

module.exports = model('Product', productSchema)