const mongoose = require('mongoose')

const musicSchema = mongoose.Schema(
  {
    name: String,
    author: String,
    description: String,
    lyrics: String,
    image: String,
    audio: String,
    category:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Category'
      }
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true //means createdAt and updateAt
  }
)

const Music = mongoose.model('Music', musicSchema)

module.exports = {Music}