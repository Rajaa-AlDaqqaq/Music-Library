const router = require("express").Router()

// controller
const authCtrl = require("../controllers/auth")
const isLoggedIn = require("../helper/isLoggedIn")
// Routes
router.get("/auth/signup", authCtrl.auth_signup_get)
router.post("/auth/signup", authCtrl.auth_signup_post)
router.get("/auth/signin", authCtrl.auth_signin_get)
router.post("/auth/signin", authCtrl.auth_signin_post)
router.get("/auth/logout", authCtrl.auth_logout_get)
router.get("/auth/edit/:id", isLoggedIn, authCtrl.auth_edit_get)
router.put("/auth/update/:id", isLoggedIn, authCtrl.auth_update_post)
router.get("/auth/detail", isLoggedIn, authCtrl.auth_show_get)
// export
module.exports = router
