const router = require('express').Router()
const multer = require('multer')

const methodOverride = require('method-override')
router.use(methodOverride('_method'))

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'audio') {
      cb(null, 'public/audios')
    } else if (file.fieldname === 'image') {
      cb(null, 'public/images')
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})
const upload = multer({ storage: storage })

// controller
const musicCtrl = require('../controllers/music')

// Routes
router.get('/music/add', musicCtrl.music_create_get)
router.post('/music/add',upload.fields([{ name: 'audio' }, { name: 'image' }]),
  musicCtrl.music_create_post
)
router.get('/music/index', musicCtrl.music_index_get)
router.get('/music/myLibrary', musicCtrl.music_myLibrary_get)
router.get('/music/detail', musicCtrl.music_show_get)
router.get('/music/delete', musicCtrl.music_delete_get)
router.get('/music/edit', musicCtrl.music_edit_get)
router.put(
  '/music/update',
  upload.fields([{ name: 'audio' }, { name: 'image' }]),
  musicCtrl.music_update_post
)
router.put('/music/detail', musicCtrl.music_addToPlaylist_put)
router.put('/music/remove', musicCtrl.music_removeFromPlaylist_put)

// export
module.exports = router
