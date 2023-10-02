const { Category  } = require('../models/Category')
const { Music } = require('../models/Music')
const moment = require('moment')


exports.category_create_get = (req, res) => {
  Music.find()
  .then((musics)=>{
    res.render('category/add',{musics})
  })

  }
  exports.category_create_post = (req, res) => {
    console.log(req.body)
    let category=new Category(req.body)
    category.save()
    .then(()=>{
      res.redirect("/category/index")
  
    })
    .catch((err)=>{
      console.log(err)
      res.send("Please try again!!");
    })

  }

  //show category details
  exports.category_details_get = (req, res) => {
    console.log(req.query.id)
    Category
      .findById(req.query.id)
      .populate('music')
      .then((category) => {
        console.log(category)
        res.render("category/detail", { category, moment })
      })
      .catch((err) => {
        console.log(err);
      });
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


  exports.category_update_get= (req,res)=>{
    console.log(req.query.id)
    category.findById(req.query.id).then((categories)=>{
      res.render("category/edit",{categories})
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  exports.category_update_post =(req,res)=>{

  }

  exports.category_delete_get=(req,res)=>{
    console.log(req.query.id)
    Category.findByIdAndDelete(req.query.id)
    .then(()=>{
      console.log()
      res.redirect("/category/index")
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  