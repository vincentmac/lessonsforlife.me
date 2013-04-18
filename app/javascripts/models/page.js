// page.js
define('models/page', function(require) {
  'use strict';

  var Backbone = require('backbone');
  var config = require('config');

  var Page = Backbone.Model.extend({

    defaults: {
      id: ''
    , type: ''
    , slug: ''
    , url:''
    , status: ''
    , title: ''
    , title_plain: ''
    , content: ''
    , excerpt: ''
    , date: ''
    , modified: ''
    , categories: []
    , tags: []
    , author: {
        id: ''
      , slug: ''
      , name: ''
      , first_name: ''
      , last_name: ''
      , nickname: ''
      , url: ''
      , description: ''
    }
    , comments: []
    , attachments: []
    , comment_count: 0
    , comment_status: ''
    },

    // url: config.apiServer + '/get_post/',
    // url: config.apiServer + '/p/',
    url: function() {
      return config.apiServer + '/get_page/?slug=' + this.get('slug');
      // return config.apiServer + '/p/' + this.id + '/?json=1';  // implicit mode
    },

    initialize: function() {
      // console.log('fetched post:', this.get('title'));
      // console.log('this:', this);
    },

    parse: function(response) {
      // console.log('response:', response);
      // console.log('Status:', response.status);
      // console.log('Page:', response.page);
      return response.page;
    }
  });

  return Page;
});