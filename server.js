const express = require("express")

// Load .env module
require("dotenv").config()

//load mongose module
const mongoose = require("mongoose")

// invoke express functionality
const app = express()

// load express EJS layout
app.use(express.static("public"))
const expressLayouts = require("express-ejs-layouts")
const bodyParser = require("body-parser")


// port configration
const port = process.env.PORT

// NodeJS to look in a folder called 'views' for all ejs file.
app.set("view engine", "ejs")

// look in view folder for a file named as Layouts.ejs
app.use(expressLayouts)

// express session  and passport
let session = require("express-session")
let passport = require("./helper/ppConfig")

app.use(bodyParser.urlencoded({ extended: false }))


app.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 36000000 },
  })
)

// initialize passport and passport session
app.use(passport.initialize())
app.use(passport.session())

app.use(function (req, res, next) {
  res.locals.currentUser = req.user
  next()
})
// import routes
const indexRouter = require("./routes/index")
const authRouter = require("./routes/auth")
const musicRouter =require("./routes/music")

// mount Routes
app.use("/", indexRouter)
app.use("/", authRouter)
app.use("/", musicRouter)


// listen to requests on port
app.listen(port, () => {
  console.log(`Music Library is running on port ${port}`)
})


// mongoDB connection
mongoose
  .connect(process.env.mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then(() => {
    console.log("MongoDB is connected")
  })
  .catch((err) => {
    console.log("MongoDB is not connected" + err)
  })
