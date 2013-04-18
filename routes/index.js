
/*
 * GET home page.
 */

var robots = require('./robots');

module.exports = function(app) {
  'use strict';

  app.get('/', function(req, res) {
  // app.get('/', robots, function(req, res) {
    var locals = { title: 'Lessons for Life'};
    res.render('index', locals);
  });

  // app.get('/api/:method', function(req, res) {
  //   var fakeResonse
  //     , fakeString;
  //   fakeString = {"status":"ok","count":1,"count_total":3,"pages":3,"posts":[{"id":63,"type":"post","slug":"testing-image-upload-to-s3","url":"http:\/\/api.lessonsforlifeproject.com\/p\/63\/testing-image-upload-to-s3\/","status":"publish","title":"Testing image upload to S3 - This is from node proxy","title_plain":"Testing image upload to S3","content":"<p>This should pull the image from static.lessonsforlifeproject.com<\/p>\n<p>When viewed on different devices it should pull different sized images suitable for that device.<br \/>\n<a href=\"http:\/\/api.lessonsforlifeproject.com\/wp-content\/uploads\/2013\/01\/991.911.GTS_.Front_.jpeg\"><img class=\"aligncenter size-full wp-image-61\" alt=\"991.911.GTS.Front\" src=\"http:\/\/api.lessonsforlifeproject.com\/wp-content\/uploads\/2013\/01\/991.911.GTS_.Front_.jpeg\" width=\"3000\" height=\"1560\" \/><\/a><\/p>\n","excerpt":"This should pull the image from static.lessonsforlifeproject.com When viewed on different devices it should pull different sized images suitable for that device.","date":"2013-01-13 00:15:36","modified":"2013-01-13 00:22:49","categories":[],"tags":[],"author":{"id":1,"slug":"admin","name":"admin","first_name":"","last_name":"","nickname":"admin","url":"","description":""},"comments":[],"attachments":[{"id":61,"url":"http:\/\/api.lessonsforlifeproject.com\/wp-content\/uploads\/2013\/01\/991.911.GTS_.Front_.jpeg","slug":"991-911-gts-front","title":"991.911.GTS.Front","description":"","caption":"","parent":63,"mime_type":"image\/jpeg","images":{"full":{"url":"http:\/\/api.lessonsforlifeproject.com\/wp-content\/uploads\/2013\/01\/991.911.GTS_.Front_.jpeg","width":3000,"height":1560},"thumbnail":{"url":"http:\/\/api.lessonsforlifeproject.com\/wp-content\/uploads\/2013\/01\/991.911.GTS_.Front_-150x150.jpeg","width":150,"height":150},"medium":{"url":"http:\/\/api.lessonsforlifeproject.com\/wp-content\/uploads\/2013\/01\/991.911.GTS_.Front_-300x156.jpeg","width":300,"height":156},"large":{"url":"http:\/\/api.lessonsforlifeproject.com\/wp-content\/uploads\/2013\/01\/991.911.GTS_.Front_-1024x532.jpeg","width":940,"height":488}}}],"comment_count":0,"comment_status":"open"}]};
  //   // fakeResonse = JSON.parse(fakeString);
  //   console.log('req.params:', req.params);
  //   console.log('req.query:', req.query);
  //   res.type('json');
  //   res.json(fakeString);
  // });

  // app.get('/channel.html', function(req, res) {
  app.get('/channel.html', robots, function(req, res) {
    res.send('<script src="//connect.facebook.net/en_US/all.js"></script>');
  });
  
  // app.get('/:slug', function(req, res) {
  app.get('/:slug', robots, function(req, res, next) {
    console.log('route slug:', req.params.slug);
    if (req.params.slug === 'rss') return next();
    var locals = { title: 'Lessons for Life'};
    res.render('index', locals);
  });

  // // app.get('/p/:id', function(req, res) {
  // app.get('/p/:id', robots, function(req, res) {
  //   console.log('route p/:id', req.params.id);

  //   var locals = { title: 'Lessons for Life'};
  //   res.render('index', locals);
  // });

  // // app.get('/p/:id/:slug', function(req, res) {
  // app.get('/p/:id/:slug', robots, function(req, res) {
  //   console.log('route p/:id/:slug:', req.params.id, req.params.slug);

  //   var locals = { title: 'Lessons for Life'};
  //   res.render('index', locals);
  // });

};