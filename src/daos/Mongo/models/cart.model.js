import mongoose from 'mongoose'

const cartsCollection = 'carts'

const cartSchema = new mongoose.Schema({
  id: Number,
  products: [{
    productId: Number,
    quantity: Number
  }]
})

export const cartModel = mongoose.model(cartsCollection, cartSchema)