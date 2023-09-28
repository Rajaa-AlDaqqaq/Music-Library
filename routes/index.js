const express = require("express")
const router = express.Router()

// connect controller
const indexCtrl = require("../controllers/index")
router.get("/", indexCtrl.index_get)

// Export statment
module.exports = router
