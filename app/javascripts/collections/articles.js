// collections/articles.js
define('collections/articles', function(require) {
  'use strict';

  var Backbone = require('backbone');
  var Article = require('models/article');

  var config = require('config');

  var Articles = Backbone.Collection.extend({

    // Reference to this collection's model
    model: Article,

    // url: '/get_recent_posts/'
    // url: config.apiServer + '/get_recent_posts/',
    url: config.apiServer + '/get_recent_posts/',
    // url: config.apiServer + '/get_post/',

    parse: function(response) {
      console.log('response:', response);
      console.log('Status:', response.status);
      console.log('Articles:', response.posts);
      return response.post;
    }
    // sync: function(method, model, options) {
    //   options || (options = {});

    //   switch (method) {
    //     case 'create':
    //     break;

    //     case 'update':
    //     break;

    //     case 'delete':
    //     break;

    //     case 'read':
    //       console.log('hello from article collection');
    //     break;
    //   }
    // }

  });

  return new Articles();
});