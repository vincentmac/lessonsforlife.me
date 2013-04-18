// lesson.js
// Lesson Model

var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://localhost/lessonsforlife');
var Schema = mongoose.Schema;
// var util = require('util');
// var events = require('events');
var LessonShort;

// util.inherits(LessonShort, events.EventEmitter);

var LessonShortSchema = new Schema({
    name: { 'type': String, 'default': '' }
  , date: { 'type': Date, 'default': Date.now }
  , email: { 'type': String, 'default': '' }
  , age: { 'type': Number, 'default': 0 }
  , occupation: { 'type': String, 'default': '' }
  , location: { 'type': String, 'default': '' }
  , lesson1: { 'type': String, 'default': '' }
  , lesson2: { 'type': String, 'default': '' }
  , lesson3: { 'type': String, 'default': '' }
  , fileurl: { 'type': String, 'default': '', required: true }
  , shorturl: { 'type': String, unique: true , required: true}
  , tags: [String]
});



var createShortFrag = function(length, data, callback) {
  length = length || 6;  // set default length to 6 characters
  var crypto = require('crypto');
  var hmac64 = crypto.createHmac('sha1', 'cryptolessonsforlifecryptokey');
  // var hmac64 = crypto.createHmac('sha1', crypto.randomBytes(5).toString('base64'));
  hmac64.update(data);
  console.log('createShortFrag data:', data);
  var shorturl = hmac64.digest('base64');
  var shorterurl = shorturl.replace(/[\/\+\=]/gi, '');  // remove /, +, and = from hash
  var shortfrag = shorterurl.substring(0, length);
  console.log('createShortFrag shortfrag:', shortfrag);

  // Check if shorturl exists
  return LessonShort.findOne({ shorturl: shortfrag }, function(err, lesson) {
    if (err) return console.error(err);
    if (lesson) {
      // lesson already exists with this shorturl.
      console.log('already exists in db');
      // Recursively run createShortFrag with modification to data
      createShortFrag(length, data + Date.now(), callback);
    } else {
      // looks good.  return shortfrag
      console.log('ok to save');
      return callback(shortfrag);
    }
  });
};



LessonShortSchema.methods.createShortUrl = function(length, callback) {
  length = length || 6;  // set default length to 6 characters
  var data = this.fileurl ? this.fileurl : this.lesson1 + this.date;
  createShortFrag(length, data, callback);
};



LessonShortSchema.methods.getByShortUrl = function(shorturl) {
  return LessonShort.findOne({ shorturl: shorturl }, function(err, lesson) {
    if (err) return console.error(err);
    if (lesson) return lesson;
    return null;
  });
};

module.exports = LessonShort = db.model('LessonShort', LessonShortSchema);
