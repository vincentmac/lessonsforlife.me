// routes/api.js

/*
 * API requests for IE.  This is a work around for IE's limitation in handling CORS
 *
 * Use jQuery on frontend to detect CORS support:
 *   `if (!$.support.cors) config.apiServer = '/api';`
 */

var request = require('request')
  , config = require('../config');

module.exports = function(app) {

  // `:method` is the api method from http://wordpress.org/extend/plugins/json-api/other_notes/
  // example route: /api/get_recent_posts?count=1&page=1&_=1358062199731
  app.get('/api/:method', function(req, res) {
    // var request = require('request');

    // `fakeResponse` is an example response from the api server
    // var fakeResponse = {"status":"ok","count":1,"count_total":3,"pages":3,"posts":[{"id":63,"type":"post","slug":"testing-image-upload-to-s3","url":"http:\/\/api.example.com\/p\/63\/testing-image-upload-to-s3\/","status":"publish","title":"Testing image upload to S3 - This is from node proxy","title_plain":"Testing image upload to S3","content":"<p>This should pull the image from static.example.com<\/p>\n<p>When viewed on different devices it should pull different sized images suitable for that device.<br \/>\n<a href=\"http:\/\/api.example.com\/wp-content\/uploads\/2013\/01\/991.911.GTS_.Front_.jpeg\"><img class=\"aligncenter size-full wp-image-61\" alt=\"991.911.GTS.Front\" src=\"http:\/\/api.example.com\/wp-content\/uploads\/2013\/01\/991.911.GTS_.Front_.jpeg\" width=\"3000\" height=\"1560\" \/><\/a><\/p>\n","excerpt":"This should pull the image from static.example.com When viewed on different devices it should pull different sized images suitable for that device.","date":"2013-01-13 00:15:36","modified":"2013-01-13 00:22:49","categories":[],"tags":[],"author":{"id":1,"slug":"admin","name":"admin","first_name":"","last_name":"","nickname":"admin","url":"","description":""},"comments":[],"attachments":[{"id":61,"url":"http:\/\/api.example.com\/wp-content\/uploads\/2013\/01\/991.911.GTS_.Front_.jpeg","slug":"991-911-gts-front","title":"991.911.GTS.Front","description":"","caption":"","parent":63,"mime_type":"image\/jpeg","images":{"full":{"url":"http:\/\/api.example.com\/wp-content\/uploads\/2013\/01\/991.911.GTS_.Front_.jpeg","width":3000,"height":1560},"thumbnail":{"url":"http:\/\/api.example.com\/wp-content\/uploads\/2013\/01\/991.911.GTS_.Front_-150x150.jpeg","width":150,"height":150},"medium":{"url":"http:\/\/api.example.com\/wp-content\/uploads\/2013\/01\/991.911.GTS_.Front_-300x156.jpeg","width":300,"height":156},"large":{"url":"http:\/\/api.example.com\/wp-content\/uploads\/2013\/01\/991.911.GTS_.Front_-1024x532.jpeg","width":940,"height":488}}}],"comment_count":0,"comment_status":"open"}]};

    // Ultimately, I want to pipe `request` to `res` to give
    // the result that `res.json(fakeResponse)` would give to the client
    // res.json(fakeResponse);

    // Reconstruct request url for api server call
    // resulting `url.path` example: /v1/get_post?count=1&page=1&_=1358062199731
    // resulting url example: api.example.com/v1/get_post?count=1&page=1&_=1358062199731
    var url = {
        hostname: config.api.hostname
      , port: 80
      , path: '/' + config.api.version + '/' + req.params['method'] + req._parsedUrl.search
    };

    // Now use `request` to make the api call and `pipe` the result
    // to the express `res` object.
    // Format of `.pipe()`: src.pipe(dst)
    // See Substack's Stream Handbook for more details: https://github.com/substack/stream-handbook
    // request.get('http://' + url.hostname + url.path).pipe(res);

    var options = {
        method: 'GET'
      , url: 'http://' + url.hostname + url.path
      , pool: { maxSockets: 0 } // Increase max sockets to prevent artifical warning
    };
    request.get(options).pipe(res);
    // request(options, function(error, response, body) {
    //   console.log(response);
    //   res.send(response);
    // });
  });

};