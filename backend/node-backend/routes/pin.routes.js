const express = require('express');
const pinRoute = express.Router();
let Pin = require('../model/Pin');
 
// Add Pin
pinRoute.route('/add-pin').post((req, res, next) => {
    Pin.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log("Success");
      res.json(data)
    }
  })
});
 
// Get all Pin
pinRoute.route('/').get((req, res) => {
    Pin.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})
 
// Get Pin after id
pinRoute.route('/read-pin/:id').get((req, res) => {
    Pin.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get Pin
pinRoute.route('/get-pin/:email').get((req, res) => {
    Pin.findOne({email: req.params.email}, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.send(data);
    }
  })
})
 
 
// Update Pin
pinRoute.route('/update-pin/:id').put((req, res, next) => {
    Pin.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('Pin updated successfully!')
    }
  })
})
 
// Delete Pin
pinRoute.route('/delete-pin/:id').delete((req, res, next) => {
    Pin.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = pinRoute;