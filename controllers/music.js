const { Category } = require('../models/Category')
const { Music } = require('../models/Music')
const moment = require('moment')


exports.music_create_get = (req, res) => {
  Category.find()
  .then((categories)=>{
    res.render('music/add',{categories})
  })
}

exports.music_create_post = (req, res) => {
  console.log('File Uploads - Audio Path: ', req.files.audio[0].path)
  console.log('File Uploads - Image Path: ', req.files.image[0].path)

  const music = new Music({
    name: req.body.name,
    author: req.body.author,
    description: req.body.description,
    lyrics: req.body.lyrics,
    image: req.files.image[0].path,
    audio: req.files.audio[0].path
  })
  console.log(req.body.categories)
  music
    .save()
    .then(() => {
  
      req.body.categories.forEach(category => {
        Category.findById(category)
        .then((category) => {
          category.music.push(music);
          category.save();
        })
        .catch((err) => {
          console.log(err)
        })
      })
      res.send("hello");
    })
    .catch((err) => {
      console.error(err)
      res.send('Please try again later.')
    })
}




exports.music_showmusic_get = (req, res) => {
  Music.find()
    .then((musics) => {
      console.log(musics)
      res.render('music/index', { musics, moment })
    })
    .catch((err) => {
      console.log(err)
    })
}
