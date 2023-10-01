const router = require('express').Router()
const multer = require('multer')

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
router.get('/music/index', musicCtrl.music_showmusic_get)

// export
module.exports = router
