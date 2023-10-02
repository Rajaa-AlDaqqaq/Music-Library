const router = require('express').Router()


// controller
const categoryCtrl = require('../controllers/category')
// Routes
router.get('/category/add',categoryCtrl.category_create_get)
router.post('/category/add',categoryCtrl.category_create_post)
router.get("/category/index", categoryCtrl.category_index_get)
router.get("/category/detail", categoryCtrl.category_details_get)
router.get("/category/edit", categoryCtrl.category_update_get)
router.post("/category/edit", categoryCtrl.category_update_post)
router.get("/category/delete", categoryCtrl.category_delete_get)


// export
module.exports = router
