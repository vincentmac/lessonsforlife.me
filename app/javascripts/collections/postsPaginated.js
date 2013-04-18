// collections/posts.js
define('collections/posts', function(require) {
  'use strict';

  var Backbone = require('backbone');
  Backbone.Paginator = require('backbone.paginator');
  // console.log('Backbone with Paginator:', Backbone);
  var Post = require('models/post');

  var config = require('config');

  // var Posts = Backbone.Collection.extend({
  var Posts = Backbone.Paginator.requestPager.extend({

    // Reference to this collection's model
    model: Post,

    // url: '/get_recent_posts/'
    // url: config.apiServer + '/get_recent_posts/',
    // url: config.apiServer + '/get_post/',
    
    // Disabled with using paginator
    // url: function() {
    //   return config.apiServer + '/get_post/?id=' + this.id;
    //   // return config.apiServer + '/p/' + this.id + '/?json=1';  // implicit mode
    // },

    paginator_core: {
      type: 'GET',
      dataType: 'json',
      url: function() {
        return config.apiServer + '/get_recent_posts/';
      }
    },

    paginator_ui: {
      firstPage: 1,
      currentPage: 1,
      perPage: 1,
      totalPages: 10
    },

    server_api: {
      'count': function() { return this.perPage; },
      'page': function() { return this.currentPage; }
    },

    parse: function(response) {
      // console.log('[Posts Collection] response:', response);
      // console.log('[Posts Collection] Status:', response.status);
      // console.log('[Posts Collection] Posts:', response.posts);

      this.totalPages = response.pages;  // set total pages available on server
      this.totalRecords = response.count_total;  // set total pages available on server

      // this.totalPages = parseInt(response.pages, 10);  // set total pages available on server
      return response.posts;
    }

  });

  // invoke immediately so we only have one copy of the collection
  return new Posts();
});
