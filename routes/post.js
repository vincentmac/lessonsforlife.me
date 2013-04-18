
/*
 * GET posts /p.
 */

// var robots = require('./robots');
var request = require('request')
  , moment = require('moment')
  , config = require('../config');

module.exports = function(app) {
  'use strict';
  
  var getPostAPI = function(id, callback) {
    var url = {
        hostname: config.api.hostname
      , port: 80
      , path: '/' + config.api.version + '/get_post/?id=' + id
    };
    var options = {
        method: 'GET'
      , url: 'http://' + url.hostname + url.path
      , pool: { maxSockets: 0 } // Increase max sockets to prevent artifical warning
    };
    request.get(options, callback);
  };

  var formatDate = function(date) {
    var dateMoment = moment(date, "YYYY-MM-DD HH:mm:ss");
    return dateMoment.format('MMMM Do, YYYY');
  };


  app.get('/p/:id', function(req, res) {
  // app.get('/p/:id', robots, function(req, res) {
    console.log('route p/:id', req.params.id);
    // var locals = { title: 'Lessons for Life'};

    function renderAPI(err, response, body) {
      if (err) return res.send(500);
      var data = JSON.parse(body);
      // if (data.status != 'ok') res.send(404);
      if (data.status != 'ok') return res.redirect('/');
      // console.log('[post content]', data.post.content);

      var fileurl = (function(data) {
        // console.log('fileurl data:', data);
        if (data.post.attachments.length > 0) return data.post.attachments[0].url;
        return 'http://static.lessonsforlifeproject.com/images/logos/owl-144.png';
      })(data);

      var postData = {
          title: 'Lessons for Life | ' + data.post.title
        , id: data.post.id
        , postTitle: data.post.title
        , content: data.post.content
        , modified: data.post.modified
        , date: data.post.date
        , dateFormatted: formatDate(data.post.date)
        , tags: data.post.tags
        , previous_id: data.post.previous_id
        , next_id: data.post.next_id
        , url: config.frontendServer + '/p/' + data.post.id
        , fileurl: fileurl
        , itemTitle: data.post.title
        , type: 'lesson'
        , description: "We're on a mission to get a million people to share their most important life lessons. What are the three things YOU wish you knew when you were younger?"
        // , description: 'What are the three things you wish you knew when you were younger? Here are mine! :)'
      };
      res.locals.postData = postData;
      res.render('post', postData);
    }

    getPostAPI(req.params.id, renderAPI);
  });

  app.get('/p/:id/:slug', function(req, res) {
  // app.get('/p/:id/:slug', robots, function(req, res) {
    console.log('route p/:id/:slug:', req.params.id, req.params.slug);

    function renderAPI(err, response, body) {
      if (err) return res.send(500);
      var data = JSON.parse(body);
      // if (data.status != 'ok') res.send(404);
      if (data.status != 'ok') return res.redirect('/');
      // console.log('[post content]', data.post.content);

      var fileurl = (function(data) {
        // console.log('fileurl data:', data);
        if (data.post.attachments.length > 0) return data.post.attachments[0].url;
        return 'http://static.lessonsforlifeproject.com/images/logos/owl-144.png';
      })(data);

      var postData = {
          title: 'Lessons for Life | ' + data.post.title
        , id: data.post.id
        , postTitle: data.post.title
        , content: data.post.content
        , modified: data.post.modified
        , date: data.post.date
        , dateFormatted: formatDate(data.post.date)
        , tags: data.post.tags
        , previous_id: data.post.previous_id
        , next_id: data.post.next_id
        , url: config.frontendServer + '/p/' + data.post.id
        , fileurl: fileurl
        , itemTitle: data.post.title
        , type: 'lesson'
        , description: 'What are the three things you wish you knew when you were younger? Here are mine! :)'
      };
      res.locals.postData = postData;
      res.render('post', postData);
    }
    // var locals = { title: 'Lessons for Life'};
    // res.render('index', locals);
    getPostAPI(req.params.id, renderAPI);
  });

};