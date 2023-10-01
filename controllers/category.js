const { Category  } = require('../models/Category')
const { Music } = require('../models/Music')
const moment = require('moment')


exports.category_create_get = (req, res) => {
  Music.find()
  .then((musics) => {
    res.render("category/add", {musics});
  })
  .catch((err) => {
    console.log(err);
  })
  }

  exports.category_create_post = async (req, res) => {
    try {
      console.log(req.body);
      let category = new Category(req.body);
      await category.save();
      
      for (const musicId of req.body.music) {
        const music = await Music.findById(musicId);
        music.category.push(category);
        await music.save();
      }
      
      res.send("hello");
    } catch (err) {
      console.log('Error:', err);
      res.send("Please try again later!!!" , err);
    }
  }
  