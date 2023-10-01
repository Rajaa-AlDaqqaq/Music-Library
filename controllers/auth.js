const User = require("../models/User")
const bcrypt = require("bcrypt")
const passport = require("passport")
const multer = require("multer")

// hashing that bcrypt
const salt = 10

// signup get
exports.auth_signup_get = (req, res) => {
  res.render("auth/signup")
}
//  signup post
exports.auth_signup_post = (req, res) => {
  let user = new User(req.body)
  let hash = bcrypt.hashSync(req.body.password, salt)
  user.password = hash
  console.log(hash)
  user
    .save()
    .then(() => {
      res.redirect("/")
    })
    .catch((err) => {
      console.log(err)
    })
}
// signin get
exports.auth_signin_get = (req, res) => {
  res.render("auth/signin")
}

exports.auth_signin_post = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/auth/signin",
})
// logout get
exports.auth_logout_get = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err)
    }
    res.redirect("/auth/signin")
  })
}

// user profile get
exports.auth_edit_get = (req, res) => {
  const userId = req.user._id
  User.findById(userId)
    .then((user) => {
      res.render("auth/edit", { user })
    })
    .catch((err) => {
      console.log(err)
    })
}

// user profile update post
exports.auth_update_post = async (req, res) => {
  const userId = req.user._id
  const { name, emailAddress, password, profilePicture, gender, dateOfBirth } =
    req.body

  try {
    let updatedUser = {
      name,
      emailAddress,
      profilePicture,
      gender,
      dateOfBirth,
    }

    if (password) {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
      updatedUser.password = hashedPassword
    }

    await User.findByIdAndUpdate(userId, updatedUser)
    res.redirect("/auth/detail")
  } catch (err) {
    console.log(err)
    res.send("Error updating user.")
  }
}
// show detail
exports.auth_show_get = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).exec()
    res.render("auth/detail", { user })
  } catch (err) {
    console.log(err)
    res.redirect("/")
  }
}
// profile picture upload
