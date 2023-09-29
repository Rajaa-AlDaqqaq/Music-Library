const mongoose = require('mongoose')

const categorySchema = mongoose.Schema(
  {
    name: String,
    description: String,
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

const Category = mongoose.model('Category', categorySchema)

module.exports = {Category}