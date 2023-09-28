const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, "First name must be more than 2 characters"],
    maxlength: [99, "the limit is 99 character"],
  },
  emailAddress: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [
      6,
      "Your password is weak. Please make it stronger for security reasons!",
    ],
  },
  profilePicture: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
})

// verify password method
userSchema.methods.verifyPassword = function (password) {
  console.log("password", password)
  console.log("this.password", this.password)
  return bcrypt.compareSync(password, this.password)
}
const User = mongoose.model("user", userSchema)
module.exports = User
