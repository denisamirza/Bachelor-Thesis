const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
let User = new Schema({
  email: {
    type: String
  },
  password: {
    type: String
  },
  name: {
    type: String
  },
  surname: {
    type: String
  },
  password: {
    type: String
  },
  imgPath: {
    type: String
  }
}, {
  collection: 'users'
})
 
module.exports = mongoose.model('User', User)
