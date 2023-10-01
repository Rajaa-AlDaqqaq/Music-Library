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
  Playlist.find()
    .then((playlists) => {
      res.render('playlist/index', { playlists })
    })
    .catch((err) => {
      console.log(err)
    })
}
