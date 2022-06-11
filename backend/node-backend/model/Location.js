const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
let Location = new Schema({
  email: {
    type: String
  },
  latitude: {
    type: Float64Array
    },
  logitute: {
    type: Float64Array
    },
}, {
  collection: 'locations'
})
 
module.exports = mongoose.model('Location', Location)