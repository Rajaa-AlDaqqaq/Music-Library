const router = require('express').Router()

const express = require('express')
router.use(express.urlencoded({ extended: true }))

const methodOverride = require('method-override')
router.use(methodOverride('_method'))


// controller
const playlistCtrl = require('../controllers/playlist')

router.get('/playlist/add', playlistCtrl.playlist_create_get)
router.post('/playlist/add', playlistCtrl.playlist_create_post)
router.get('/playlist/index', playlistCtrl.playlist_index_get)


// export
module.exports = router
