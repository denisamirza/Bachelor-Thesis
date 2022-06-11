const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sharp = require("sharp");
 
let Post = new Schema({
  email: {
        type: String
        },
  title: {
    type: String
  },
  time: {
      type: String
  },
  location: {
    type: String
  },
  description: {
    type: String
  },
  imgPath: {
    type: String
  }
}, {
  collection: 'posts'
})
 
module.exports = mongoose.model('Post', Post)