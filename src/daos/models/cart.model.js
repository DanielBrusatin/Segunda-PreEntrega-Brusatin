import mongoose from 'mongoose'

const cartsCollection = 'carts'

const cartSchema = new mongoose.Schema({
  products: {
    type: [{
      _id: String,
      quantity: Number
    }],
    default: []
  }
})

export default mongoose.model(cartsCollection, cartSchema)