const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  userId: {
    required: true,
    type: String,
    unique: true
  },
  userName: {
    required: true,
    type: String,
    unique: false
  },
  accessToken: {
    type: String,
    unique: true,
    required: true
  },
  refreshToken: {
    type: String,
    unique: true,
    required: true
  }
})

module.exports = model('User', userSchema)
