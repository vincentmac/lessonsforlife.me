// social.js

/*
 * GET social /s/:shorturl.
 */

// var robots = require('./robots');
var LessonShort = require('../models/lessonShort');

module.exports = function(app) {
  'use strict';
  
  app.get('/s/:shorturl', function(req, res) {
  // app.get('/s/:id', robots, function(req, res) {
    console.log('route s/:shorturl', req.params.shorturl);

    // LessonShort.getByShortUrl(req.params.shorturl, function(err, lesson) {
    //   if (err) res.send(404);
    //   console.log('fetched lesson data from mongodb:', lesson);

    //   var locals = { title: 'Lessons for Life'};
    //   res.render('index', locals);
    // });

    LessonShort.findOne({ shorturl: req.params.shorturl }, function(err, lesson) {
      if (err) res.send(404);
      if (lesson) {
        // console.log('fetched lesson data from mongodb:', lesson);

        var locals = {
            title: 'Lessons for Life'
          , name: lesson.name
          , age: lesson.age
          , occupation: lesson.occupation
          , location: lesson.location
          , lesson1: lesson.lesson1
          , lesson2: lesson.lesson2
          , lesson3: lesson.lesson3
          , fileurl: lesson.fileurl
          , shorturl: lesson.shorturl
          , url: 'http://wsdm.us/' + lesson.shorturl
          , itemTitle: lesson.name + ', ' + lesson.location
          , type: 'lesson'
          , description: "We're on a mission to get a million people to share their most important life lessons. What are the three things YOU wish you knew when you were younger?"
        };
        res.render('social', locals);
      } else {
        console.warn('lesson shorturl not found in mongodb:', req.params.shorturl);
        console.log('redirecting to /');
        res.redirect('/');
      }
    });

  });

};