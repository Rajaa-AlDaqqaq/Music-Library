const { Category  } = require('../models/Category')
const { Music } = require('../models/Music')
const moment = require('moment')


exports.category_create_get = (req, res) => {
    res.render("category/add");

  }
  exports.category_create_post = (req, res) => {
    console.log(req.body);
  
    let category = new Category(req.body);
  
    category.save()
    .then(() => {
      res.redirect("/category/index")
    })
    .catch((err) => {
      console.log(err);
      res.send("Please try again later!!!");
    })
  }
  

  exports.category_index_get=(req,res)=>{
      Category.find()
      .then( (categories) => {
        res.render("category/index", {categories, moment})
      })
      .catch( (err) => {
        console.log(err);
      })
    
  }
  