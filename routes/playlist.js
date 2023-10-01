const express = require('express')
const router = express.Router()

router.use(express.urlencoded({ extended: true }))

const methodOverride = require('method-override')
router.use(methodOverride('_method'))

// controller
const playlistCtrl = require('../controllers/playlist')

router.get('/playlist/add', playlistCtrl.playlist_create_get)
router.post('/playlist/add', playlistCtrl.playlist_create_post)
router.get('/playlist/index', playlistCtrl.playlist_index_get)
router.get('/playlist/edit', playlistCtrl.playlist_edit_get)
router.put('/playlist/update', playlistCtrl.playlist_update_post)
router.get('/playlist/delete', playlistCtrl.playlist_delete_get)
router.get('/playlist/detail', playlistCtrl.playlist_show_get)




// export
module.exports = router
