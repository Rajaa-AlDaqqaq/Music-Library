const router = require("express").Router()
const multer = require('multer')


//multer 
const storage = multer.diskStorage({
  destination: 'public/images',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})
const upload = multer({ storage: storage })

// controller
const authCtrl = require("../controllers/auth")
const isLoggedIn = require("../helper/isLoggedIn")
// Routes
router.get("/auth/signup",  authCtrl.auth_signup_get)
router.post("/auth/signup",upload.single('profilePicture'), authCtrl.auth_signup_post)
router.get("/auth/signin", authCtrl.auth_signin_get)
router.post("/auth/signin", authCtrl.auth_signin_post)
router.get("/auth/logout", authCtrl.auth_logout_get)
router.get("/auth/edit", upload.single('profilePicture'), isLoggedIn, authCtrl.auth_edit_get)
router.post("/auth/update", isLoggedIn, authCtrl.auth_update_post)
router.get("/auth/detail", isLoggedIn, authCtrl.auth_show_get)

// export
module.exports = router
