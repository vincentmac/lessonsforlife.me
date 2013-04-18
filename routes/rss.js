// rss.js

var RSS = require('rss')
  , request = require('request')
  , config = require('../config');

module.exports = function(app) {
  'use strict';

  app.get('/rss', function(req, res) {
    var locals = { title: 'Lessons for Life'};

    var feed = new RSS({
      title: 'Lessons for Life Project',
      description: 'A project to share life\'s greatest lessons.',
      feed_url: config.frontendServer + '/rss',
      site_url: config.frontendServer,
      image_url: config.frontendServer + '/icon.png',
      author: 'Snow White Bui'
    });

    var url = config.apiServer + '/get_recent_posts/';
    var recentPosts = [];

    function generateRSSItems(posts) {
      posts.forEach(function(post){
        // var item = {
        //   title: post.title,
        //   description: post.excerpt,
        //   url: 'http://lessonsforlifeproject.com/p/' + post.id + post.slug,
        //   guid: post.id, // optional - defaults to url
        //   author: post.author.name, // optional - defaults to feed author property
        //   date: post.date // any format that js Date can parse.
        // };
        // console.log('[RSS] item:', item);
        feed.item({
          title: post.title,
          description: post.excerpt,
          url: config.frontendServer + '/p/' + post.id + '/' + post.slug,
          guid: post.id, // optional - defaults to url
          author: post.author.name, // optional - defaults to feed author property
          date: post.date // any format that js Date can parse.
        });
      });
    }

    request.get({ url: url, json: true }, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        recentPosts = body.posts;
        // console.log('[RSS] recentPosts:', recentPosts);
        generateRSSItems(recentPosts);
        res.send(feed.xml());
      } else {
        res.send(500);
      }
    });

  });

};