const express = require('express');
const app = express();
const multer = require("multer");
const path = require('path');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads');
    },
  
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
  
var upload = multer({ storage: storage })
const fs = require('fs');
const bcrypt = require('bcryptjs');
 
const postRoute = express.Router();
let Post = require('../model/Post');
 
// Add Post
postRoute.route('/add-post').post(upload.single('image'), (req, res, next) => {
    if (req.file != undefined) {
      const path = req.file.path
      console.log(path)
      req.body.imgPath = path;
    }

    Post.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log("Success");
      res.json(data)
    }
  })
});
 
// Get all Post
postRoute.route('/').get((req, res) => {
    Post.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})
 
// Get Post after id
postRoute.route('/read-post/:id').get((req, res) => {
    Post.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

postRoute.route('/get-posts/:email').get((req, res) => {
    Post.find({email: req.params.email}, (err, result) => {
        if (err) {
           res.status(400).send("Error fetching listings!");
       } else {
           console.log(result);
           res.send(result)
        }
      });
})
 
 
// Update Post
postRoute.route('/update-post/:id').put((req, res, next) => {
    Post.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('Post updated successfully!')
    }
  })
})
 
// Delete Post
postRoute.route('/delete-post/:id').delete((req, res, next) => {
    Post.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

postRoute.get("/uploads/:imagePath", (req, res) => {
    console.log("denii:"+__dirname)
    res.sendFile(path.join("C:/Users/Deni/Desktop/licenta/backend", "./uploads/" + req.params.imagePath));
  });
 
module.exports = postRoute;