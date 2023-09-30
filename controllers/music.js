const { Music } = require('../models/Music')
const moment = require('moment')

exports.music_create_get = (req, res) => {
  res.render('music/add')
}

exports.music_create_post = (req, res) => {
  console.log('File Uploads - Audio Path: ', req.files.audio[0].path)
  console.log('File Uploads - Image Path: ', req.files.image[0].path)
  // Create and Save a new Music document using Mongoose
  const music = new Music({
    name: req.body.name,
    author: req.body.author,
    description: req.body.description,
    lyrics: req.body.lyrics,
    image: req.files.image[0].path,
    audio: req.files.audio[0].path
  })

  music
    .save()
    .then(() => {
      res.send('Music added successfully!')
    })
    .catch((err) => {
      console.error(err)
      res.send('Please try again later.')
    })
}

exports.music_index_get = (req, res) => {
  Music.find()
    .then((musics) => {
      console.log(musics)
      res.render('music/index', { musics, moment })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.music_show_get = (req, res) => {
  console.log(req.query.id)
  Music.findById(req.query.id)
    // .populate('category')
    .then((music) => {
      res.render('music/detail', { music, moment })
    })
    .catch((err) => {
      console.log(err)
    })
}
