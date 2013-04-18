// models/article.js

define('models/article', function(require) {
  'use strict';

  var Backbone = require('backbone');
  var config = require('config');

  var Article = Backbone.Model.extend({

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

    url: function() {
      return config.apiServer + '/get_post/?id=' + this.id;
    },
    // url: config.apiServer + '/get_post/',

    initialize: function() {
      // console.log('fetched article:', this.get('title'));
      // console.log('this:', this);
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
    //       console.log('hello from article model');
    //     break;
    //   }
    // }
  });

  return Article;
});