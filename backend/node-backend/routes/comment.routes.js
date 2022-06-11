const express = require('express');
const commentRoute = express.Router();
let Comment = require('../model/Comment');
 
// Add Comment
commentRoute.route('/add-comment').post((req, res, next) => {
    Comment.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log("Success");
      res.json(data)
    }
  })
});
 
// Get all Comment
commentRoute.route('/').get((req, res) => {
    Comment.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})
 
// Get Comment after id
commentRoute.route('/read-comment/:id').get((req, res) => {
    Comment.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get Comment
commentRoute.route('/get-comment/:postId').get((req, res) => {
    Comment.find({postId: req.params.postId}, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.send(data);
    }
  })
})
 
 
// Update Comment
commentRoute.route('/update-comment/:id').put((req, res, next) => {
    Comment.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('Comment updated successfully!')
    }
  })
})
 
// Delete Comment
commentRoute.route('/delete-comment/:id').delete((req, res, next) => {
    Comment.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = commentRoute;