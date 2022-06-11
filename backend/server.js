let express = require('express'),
mongoose = require('mongoose'),
cors = require('cors'),
bodyParser = require('body-parser'),
mongoDb = require('./node-backend/database/db');
const createError = require('http-errors');
 
mongoose.Promise = global.Promise;
mongoose.connect(mongoDb.db, {
  useNewUrlParser: true,
}).then(() => {
    console.log('Database sucessfully connected ')
  },
  error => {
    console.log('Database error: ' + error)
  }
)
 
const userRoute = require('./node-backend/routes/user.routes')
const postRoute = require('./node-backend/routes/post.routes')
const commentRoute = require('./node-backend/routes/comment.routes')
const pinRoute = require('./node-backend/routes/pin.routes')
const followerRoute = require('./node-backend/routes/follower.routes')
 
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());

// API root
app.use('/user', userRoute)
app.use('/post', postRoute)
app.use('/comment', commentRoute)
app.use('/pin', pinRoute)
app.use('/follower', followerRoute)
 
// PORT
const port = process.env.PORT || 8000;
 
app.listen(port, () => {
  console.log('Listening on port ' + port)
})
 
// 404 Handler
app.use((req, res, next) => {
  next(createError(404));
});
 
// Base Route
app.get('/', (req, res) => {
  res.send('invaild endpoint');
});
 
// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});