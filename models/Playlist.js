const mongoose = require('mongoose')

const playlistSchema = mongoose.Schema(
  {
    name: String,
    music:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Music'
      }
    ]
  },
  {
    timestamps: true //means createdAt and updateAt
  }
)

const Playlist = mongoose.model('Playlist', playlistSchema)

module.exports = {Playlist}