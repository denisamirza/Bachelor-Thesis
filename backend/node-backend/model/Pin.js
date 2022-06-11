const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
let Pin = new Schema({
  postId: {
        type: String
        },
  email: {
    type: String
  }
}, {
  collection: 'pins'
})
 
module.exports = mongoose.model('Pin', Pin)