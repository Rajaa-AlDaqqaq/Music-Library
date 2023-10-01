const { Playlist } = require('../models/Playlist.js')

exports.playlist_create_get = (req, res) => {
  res.render('playlist/add')
}

exports.playlist_create_post = (req, res) => {
  console.log(req.body)

  let playlist = new Playlist({
    name: req.body.name,
    user: req.user._id
  })

  playlist
    .save()
    .then(() => {
      res.redirect('/playlist/index')
    })
    .catch((err) => {
      console.log(err)
      res.send('Please try again later')
    })
}

exports.playlist_index_get = (req, res) => {
  const userId = req.user._id

  Playlist.find({ user: userId })
    .then((userPlaylist) => {
      res.render('playlist/index', { userPlaylist })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.playlist_edit_get = (req, res) => {
  console.log(req.query.id)
  Playlist.findById(req.query.id)
    .then((playlist) => {
      res.render('playlist/edit', { playlist })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.playlist_update_post = (req, res) => {
  console.log(req.body.id)
  Playlist.findByIdAndUpdate(req.body.id, {
    name: req.body.name
  })
    .then(() => {
      res.redirect('/playlist/index')
    })
    .catch((err) => {
      console.log(err)
    })
}
