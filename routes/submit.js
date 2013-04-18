// routes/submit.js

/*
 * Handle user submitted lessons.
 *
 * Use Amazon SES
 */

var nodemailer = require('nodemailer');

var LessonShort = require('../models/lessonShort');

LessonShort.ensureIndexes(function (err) {
  if (err) return console.error(err);
});

LessonShort.on('index', function (err) {
  if (err) console.error(err); // error occurred during index creation
});

module.exports = function(app) {

  app.post('/submit', function(req, res) {
    var fs = require('fs');
    var path = require('path');
    var credentials = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', './credentials/aws-credentials.json')));

    // console.log('[AWS SES] Credentials:', credentials);
    // console.log('[Amazon SES] req.body:', req.body);
    // console.log('[Amazon SES] req.body.name:', req.body.name);

    function compileTextEmail(data, template) {
      for (var key in data) {
        template = template.replace('#{'+ key +'}', data[key]);
      }
      return template;
    }

    function generateEmail(data, view) {
      var jade = require('jade');
      // var path = require('path');
      var emailViews = path.normalize(__dirname + '/../views/emails');

      var jadeTemplate = fs.readFileSync(emailViews + '/' + view + '.jade').toString();
      var txtTemplate = fs.readFileSync(emailViews + '/' + view + '.txt').toString();

      var compiledJade = jade.compile(jadeTemplate, {pretty:true})(templateData);
      var compiledText = compileTextEmail(data, txtTemplate);
      var templates = {
        jade: compiledJade,
        text: compiledText
      };
      return templates;
    }

    var templateData = {
      name: req.body.name || '',
      email: req.body.email || '',
      age: req.body.age || 0,
      occupation: req.body.occupation || '',
      location: req.body.location || '',
      lesson1: req.body.lesson1 || '',
      lesson2: req.body.lesson2 || '',
      lesson3: req.body.lesson3 || '',
      fileurl: req.body.fileurl || ''
      // shorturl: ''
    };

    // var util = require('util');
    // var events = require('events');
    // util.inherits(LessonShort, events.EventEmitter);
    // console.log('templateData:', templateData);
    var lesson = new LessonShort(templateData);

    function saveShortUrl(newShortUrl) {
      lesson.set('shorturl', newShortUrl);
      console.log('saveShortUrl: lesson', lesson);
      lesson.save(function(err, result) {
        if (err) {
          console.error('Error saving:', err);
          return res.send(500);
        }
        lesson.emit('LessonShort:saved', newShortUrl);
      });
    }

    lesson.createShortUrl(6, saveShortUrl);

    lesson.on('LessonShort:saved', function(shorturl) {
      templateData.shorturl = shorturl;
      console.log(templateData);

      var email = generateEmail(templateData, 'submitLesson');

      var transport = nodemailer.createTransport('SES', {
        AWSAccessKeyID: credentials.accessKeyId,
        AWSSecretKey: credentials.secretAccessKey
      });

      // console.log('[Amazon SES] Configured');

      var mailOptions = {
        from: "Snow White Bui <snow@lessonsforlife.me>", // sender address
        to: req.body.email, // list of receivers
        bcc: 'snow@lessonsforlife.me',
        // bcc: 'vincent@lessonsforlife.me',
        subject: 'Thanks for the new Lesson!', // Subject line
        text: email.text, // plaintext body
        html: email.jade // html body
      };

      // send mail with defined transport object
      transport.sendMail(mailOptions, function(err, response){
        if (err) {
          // res.send(err);
          console.log('[Amazon SES] error:', err);
          return res.send(500);
        }
        transport.close(); // shut down the connection pool, no more messages
        // return callback(null, true);
        // console.log('[Amazon SES] data:', response);
        // res.send(200);
        res.send(templateData);
        // return res.send(200);
      });

    });

    // var email = generateEmail(templateData, 'submitLesson');
    
    // var transport = nodemailer.createTransport('SES', {
    //   AWSAccessKeyID: credentials.accessKeyId,
    //   AWSSecretKey: credentials.secretAccessKey
    // });

    // // console.log('[Amazon SES] Configured');

    // var mailOptions = {
    //   from: "Snow White Bui <snow@lessonsforlifeproject.com>", // sender address
    //   to: req.body.email, // list of receivers
    //   // bcc: 'snow@lessonsforlifeproject.com',
    //   subject: 'Thanks for the new Lesson!', // Subject line
    //   text: email.text, // plaintext body
    //   html: email.jade // html body
    // };

    // // send mail with defined transport object
    // transport.sendMail(mailOptions, function(err, response){
    //   if (err) {
    //     // res.send(err);
    //     console.log('[Amazon SES] error:', err);
    //     return res.send(500);
    //   }
    //   transport.close(); // shut down the connection pool, no more messages
    //   // return callback(null, true);
    //   // console.log('[Amazon SES] data:', response);
    //   res.send(200);
    //   // return res.send(200);
    // });

  });

  app.get('/submit/s3Credentials/:filename', function(req, res) {
    var fs = require('fs')
      , path = require('path')
      , crypto = require('crypto')
      , mime = require('mime')
      , moment = require('moment');

    var filename
      , mimetype
      , credentials;

    // Creates an object that has all of the data needed to submit an
    // image to Amazon S3 via the browser.
    function createS3Policy( mimetype, credentials, callback ) {
      // s3 policy is only valid for 30 minutes and file size is limited to 4MB
      var s3Policy = {
        expiration: moment.utc().add('minutes', 30).format('YYYY-MM-DDTHH:mm:ss\\Z'),
        conditions: [
          { bucket: 'static.lessonsforlifeproject.com' },
          // ['starts-with', '$Content-Disposition', ''],
          ['starts-with', '$key', 'uploads/'],
          { acl: 'public-read' },
          { success_action_status: '201' },
          ['content-length-range', 0, 4194304],
          ['eq', '$Content-Type', mimetype]
        ]
      };

      function signPolicy(policy, AWSSecretKey) {
        return crypto.createHmac('sha1', AWSSecretKey).update(policy).digest('base64');
      }

      var s3PolicyBase64 = new Buffer( JSON.stringify( s3Policy ) ).toString( 'base64' );
      var s3Signature = signPolicy(s3PolicyBase64, credentials.secretAccessKey);
      // console.log('s3Signature:', s3Signature);

      var s3Credentials = {
        s3PolicyBase64: s3PolicyBase64,
        s3Signature: s3Signature,
        s3Key: credentials.accessKeyId,
        s3Redirect: '',
        s3Policy: s3Policy,
        mimetype: mimetype
      };

      callback( s3Credentials );
    }


    filename = req.params.filename.toString();
    mimetype = mime.lookup(filename);
    credentials = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', './credentials/aws-s3upload-credentials.json')));
    
    console.log('[submit/s3Credentials] mime:', mimetype);
    console.log('[submit/s3Credentials] filename:', filename);
    console.log('[submit/s3Credentials] params:', req.params);

    createS3Policy(mimetype, credentials, function(s3Credentials) {
      res.json(s3Credentials);
    });
    // res.send(200);

  });

};
