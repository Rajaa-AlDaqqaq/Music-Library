const passport = require("passport")

const LocalStrategy = require("passport-local").Strategy
const User = require("../models/User")

// Serialize User
// Saving the data into the session
// Here we are storing only ID
// ID is a unique identifier
passport.serializeUser(function (user, done) {
  done(null, user.id)
})

// Deserialize User
// Reading the infromation from the database according to user id (session)
passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id)
    done(null, user)
  } catch (error) {
    done(error)
  }
})

passport.use(
  new LocalStrategy(
    {
      usernameField: "emailAddress",
      passwordField: "password",
    },
    async function (emailAddress, password, done) {
      try {
        const user = await User.findOne({ emailAddress })
        if (!user) {
          return done(null, false)
        }
        if (!user.verifyPassword(password)) {
          return done(null, false)
        }
        return done(null, user)
      } catch (error) {
        return done(error)
      }
    }
  )
)

module.exports = passport
