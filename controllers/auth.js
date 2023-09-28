const User = require("../models/User")
const bcrypt = require("bcrypt")
const passport = require("passport")

const salt = 10

exports.auth_signup_get = (req, res) => {
  res.render("auth/signup")
}

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
