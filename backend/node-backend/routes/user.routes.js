const express = require('express');
const createError = require('http-errors');
const path = require('path');
const multer = require("multer");
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
 
const userRoute = express.Router();
let User = require('../model/User');


// Login User
userRoute.route('/login')
    .post((request, response) => {
      User.collection.findOne({email: request.body.email}, (err, foundItem) => {
            if (foundItem) {
                if (bcrypt.compare(request.body.password, foundItem.password)) {
                    console.log("success!");
                    response.status(200).json({status: "ok"})
                }
            }
            else {
              console.log(err);
            }
        })
    })
 
// Add User
userRoute.route('/add-user').post(upload.single('image'), (req, res, next) => {
  if (req.file != undefined) {
    const path = req.file.path
    console.log(path)
    req.body.imgPath = path;
  }
    req.body.password = bcrypt.hashSync(req.body.password, 10)
    User.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log("Success");
      res.json(data)
    }
  })
});
 
// Get all User
userRoute.route('/').get((req, res) => {
    User.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})
 
// Get User after id
userRoute.route('/read-user/:id').get((req, res) => {
    User.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Check User exists after email
userRoute.route('/user-exist/:email').get((req, res) => {
    User.findOne({email: req.params.email}, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.sendStatus(200);
    }
  })
})

// Get User
userRoute.route('/get-user/:email').get((req, res) => {
    User.findOne({email: req.params.email}, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.send(data);
    }
  })
})
 
 
// Update User
userRoute.route('/update-user/:id').put((req, res, next) => {
    User.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('User updated successfully!')
    }
  })
})
 
// Delete User
userRoute.route('/delete-user/:id').delete((req, res, next) => {
    User.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

userRoute.route("/uploads/:imageName").get((req, res) => {
  const imageName = req.params.imageName
  const imagePath = path.join("C:/Users/Deni/Desktop/licenta/backend", "uploads", imageName);

  fs.exists(imagePath, exists => {
      if (exists) res.sendFile(imagePath);
      else res.status(400).send('Error: Image does not exists');
  });
});
 
module.exports = userRoute;