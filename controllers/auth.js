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
exports.auth_update_post = (req, res) => {
  console.log(req.file.path)
  const userId = req.user._id
  const { name, emailAddress, password, gender, dateOfBirth } = req.body
  let profilePicture 
  if(req.file.path){
  profilePicture  = req.file.path
  }

  User.findById(userId)
    .then((user) => {
      if (req.body.prev !== password) {
        let hashPass = bcrypt.hashSync(password, salt);
        user.password = hashPass;
      }

      user.name = name;
      user.emailAddress = emailAddress;
      user.profilePicture = profilePicture;
      user.gender = gender;
      user.dateOfBirth = dateOfBirth;

      return user.save(); // Save the updated user document
    })

    .then(() => {
      res.redirect("/auth/detail");
    })
    .catch((err) => {
      console.log( err);
    });
};
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
//
