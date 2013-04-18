// post.js

define('models/post', function(require) {
  'use strict';
  // console.log('loading post model');
  var Backbone = require('backbone')
    , config = require('config')
    , moment = require('moment');

  var Post = Backbone.Model.extend({

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
    , dateFormatted: ''
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
    , previous_id: ''
    , next_id: ''
    },

    // url: config.apiServer + '/get_post/',
    // url: config.apiServer + '/p/',
    url: function() {
      // console.log('[Post Model] .get(id):', this.get('id'));
      return config.apiServer + '/get_post/?id=' + this.get('id');
      // return config.apiServer + '/p/' + this.id + '/?json=1';  // implicit mode
    },

    initialize: function() {
      // console.log('fetched post:', this.get('title'));
      // console.log('this:', this);
    },

    formatDate: function(data) {
      // console.log('[Post Model] post data:', data);
      var dateMoment = moment(data.date, "YYYY-MM-DD HH:mm:ss");
      var formattedDate = dateMoment.format('MMMM Do, YYYY');
      data.dateFormatted = formattedDate;
      return data;
    },

    parse: function(response) {
      var data = response;
      // console.log('[Post Model] data:', data);
      // console.log('[Post Model] Status:', response.status);
      // console.log('[Post Model] Post:', response.post);
      // return response.post;
      // if (response.status === 'ok') return response.post;  // return value from model fetch
      if (response.status === 'ok') data = response.post;  // return value from model fetch
      // console.log('[Post Model] response from collection:', data);
      data = this.formatDate(data);
      // console.log('[Post Model] after formatDate:', data);
      return data;  // return value from collection fetch
    }
  });

  return Post;
});