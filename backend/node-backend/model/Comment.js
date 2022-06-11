const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
let Comment = new Schema({
  comment: {
        type: String
        },
  postId: {
    type: String
  },
  email: {
      type: String
  }
}, {
  collection: 'comments'
})
 
module.exports = mongoose.model('Comment', Comment)