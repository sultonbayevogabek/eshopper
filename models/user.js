const {Schema, model} = require('mongoose')

const userSchema = new Schema({
   name: {
      type: String,
      required: true,
      minlength: 3
   },
   email: {
      type: String,
      unique: true,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   img: {
      type: String,
      default: 'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png'
   },
   phone: {
      type: Number,
      min: 998600000000,
      max: 998999999999
   },
   telegram: {
      type: String,
      minlength: 3
   },
   address: {
      type: String,
      minlength: 5
   },
   cart: [
      {
         count: {
            type: Number
         },
         productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
         },
         title: String,
         img: String,
         price: Number,
         totalPrice: Number
      }
   ],
   totalPrice: {
      type: Number,
      default: 0
   }
}, {collection: 'users'})

module.exports = model('User', userSchema)