import mongoose from "mongoose";

const productsCollection = 'products'

const productSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  code: {
    type: String,
    unique: true
  },
  price: Number,
  status: {
    type: Boolean,
    default: true
  },
  stock: Number,
  category: String,
  thumbnails: [String]
})

export const productModel = mongoose.model(productsCollection, productSchema)