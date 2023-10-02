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
    audio: req.files.audio[0].path,
    user: req.user._id
  })
  console.log(req.body.categories)
  music
    .save()
    .then(() => {
  
      req.body.categories.forEach(category => {
        Category.findById(category)
        .then((category) => {
          
          category.music.push(music)
          music.category.push(category)
          category.save()
          music.save()
        })
        .catch((err) => {
          console.log(err)
        })
      })
      res.redirect('/music/index') 
    })
    .catch((err) => {
      console.error(err)
      res.send('Please try again later.', err)
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


//show details of music
exports.music_show_get = (req, res) => {
  console.log(req.query.id)
  Music.findById(req.query.id).populate('category')
    .then((music) => {
      res.render('music/detail', { music, moment })
    })
    .catch((err) => {
      console.log(err)
    })
}
exports.music_delete_get = (req, res) => {
  console.log(req.query.id)
  Music.findByIdAndDelete(req.query.id)
    .then(() => {
      res.redirect('/music/index')
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.music_edit_get = (req, res) => {
  console.log(req.query.id)
  Music.findById(req.query.id)
    .then((music) => {
      res.render('music/edit', { music })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.music_update_post = (req, res) => {
  console.log(req.body.id)
  console.log('File Uploads - Audio Path: ', req.files.audio[0].path)
  console.log('File Uploads - Image Path: ', req.files.image[0].path)
  console.log('Request Body:', req.body);
console.log('Uploaded Files:', req.files);


  Music.findByIdAndUpdate(req.body.id, {
    name: req.body.name,
    author: req.body.author,
    description: req.body.description,
    lyrics: req.body.lyrics,
    image: req.files.image[0].path,
    audio: req.files.audio[0].path,
    user: req.user._id
  })
    .then(() => {
      res.redirect('/music/index')
    })
    .catch((err) => {
      console.log(err)
    })
}


exports.music_myLibrary_get = (req, res) => {

  const userId = req.user._id;

  Music.find({ user: userId })
    .then((userMusic) => {
      res.render('music/myLibrary', { userMusic, moment });
    })
    .catch((err) => {
      console.log(err);
    });
}
