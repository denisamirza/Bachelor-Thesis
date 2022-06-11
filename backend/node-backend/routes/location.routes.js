const express = require('express');
const locationRoute = express.Router();
let Location = require('../model/Location');
 
// Add Location
locationRoute.route('/add-location').post((req, res, next) => {
    Location.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log("Success");
      res.json(data)
    }
  })
});
 
// Get all Location
locationRoute.route('/').get((req, res) => {
    Location.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})
 
// Get Location after id
locationRoute.route('/read-location/:id').get((req, res) => {
    Location.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get Location
locationRoute.route('/get-location/:postId').get((req, res) => {
    Location.find({postId: req.params.postId}, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.send(data);
    }
  })
})
 
 
// Update Location
locationRoute.route('/update-location/:email').put((req, res, next) => {
    Location.findByIdAndUpdate(req.params.email, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('Location updated successfully!')
    }
  })
})
 
// Delete Location
locationRoute.route('/delete-location/:id').delete((req, res, next) => {
    Location.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = locationRoute;