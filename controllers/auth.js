const User = require("../models/User")
const bcrypt = require("bcrypt")
const passport = require("passport")

const salt = 10

exports.auth_signup_get = (req, res) => {
  res.render("auth/signup")
}

exports.auth_signup_post = (req, res) => {
  console.log(req.file.path)
  console.log(req.body.password)
  let user = new User(req.body)
  let hash = bcrypt.hashSync(req.body.password, salt)
  user.password = hash
  user.profilePicture= req.file.path
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

exports.auth_signin_get = (req, res) => {
  res.render("auth/signin")
}

exports.auth_signin_post = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/auth/signin",
})

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
exports.auth_update_post = (req, res) => {
  console.log(req.file.path)
  const userId = req.user._id
  const { name, emailAddress, password, gender, dateOfBirth } = req.body
  const profilePicture = req.file.path
  User.findByIdAndUpdate(userId, {
    name,
    emailAddress,
    password,
    profilePicture,
    gender,
    dateOfBirth,
  })
    .then(() => {
      res.redirect("/auth/detail")
    })
    .catch((err) => {
      console.log(err)
    })
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
