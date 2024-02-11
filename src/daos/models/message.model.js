import mongoose from 'moongoose'

const messagesCollection = 'messages'

const messageSchema = new mongoose.Schema({
  user: String,
  message: String
})

export const messageModel = mongoose.model(messagesCollection, messageSchema)