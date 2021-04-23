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
   cart: {
      products: [
         {
            count: {
               type: Number,
               required: true,
               default: 1
            },
            productId: {
               type: Schema.Types.ObjectId,
               ref: 'Products',
               required: true
            }
         }
      ]
   }
}, {collection: 'users'})

module.exports = model('User', userSchema)