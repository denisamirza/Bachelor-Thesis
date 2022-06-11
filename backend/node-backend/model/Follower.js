const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
let Follow = new Schema({
  follower: {
    type: String
        },
  followed: {
    type: String
  }
}, {
  collection: 'followers'
})
 
module.exports = mongoose.model('Follower', Follow)