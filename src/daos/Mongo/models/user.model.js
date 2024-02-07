import mongoose from "mongoose"

const usersCollection = 'users'

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email:{
    type: String,
    unique: true,
    require: true
  }
})

export const userModel = mongoose.model(usersCollection, userSchema)