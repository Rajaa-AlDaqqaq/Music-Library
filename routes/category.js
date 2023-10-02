const router = require('express').Router()


// controller
const categoryCtrl = require('../controllers/category')
// Routes
router.get('/category/add',categoryCtrl.category_create_get)
router.post('/category/add',categoryCtrl.category_create_post)
router.get("/category/index", categoryCtrl.category_index_get)
router.get("/category/detail", categoryCtrl.category_details_get)


// export
module.exports = router
