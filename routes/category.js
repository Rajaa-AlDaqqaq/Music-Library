const router = require('express').Router()


// controller
const categoryCtrl = require('../controllers/category')
// Routes
router.get('/category/add',categoryCtrl.category_create_get)
router.post('/category/add',categoryCtrl.category_create_post)


// export
module.exports = router
