const express = require('express');
const followRoute = express.Router();
let Follow = require('../model/Follower');
 
// Add Follow
followRoute.route('/add-follow').post((req, res, next) => {
    Follow.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log("Success");
      res.json(data)
    }
  })
});
 
// Get all Follow
followRoute.route('/').get((req, res) => {
    Follow.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get Followers of a user
followRoute.route('/get-followers/:email').get((req, res) => {
    Follow.findOne({followed: req.params.email}, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.send(data);
    }
  })
})

// Get Followed users of a user
followRoute.route('/get-followed/:email').get((req, res) => {
    Follow.findOne({follower: req.params.email}, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.send(data);
    }
  })
})
 
 
// Update Follow
followRoute.route('/update-follow/:id').put((req, res, next) => {
    Follow.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('Follow updated successfully!')
    }
  })
})
 
// Delete Follow
followRoute.route('/delete-follow/:id').delete((req, res, next) => {
    Follow.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = followRoute;