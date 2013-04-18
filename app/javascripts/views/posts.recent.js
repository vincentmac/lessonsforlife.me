// posts.latest.js
define('views/posts.recent', function(require) {
  'use strict';

  // console.log('hello');
  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');

  // var template = require('jade!templates/index');
  var config = require('config');

  var PostExcerptView = require('views/post.excerpt');

  var RecentPostsView = Backbone.View.extend({

    // el: $('#lessons-excerpts'),

    // template: _.template(template()),

    initialize: function() {
      // console.log('[RecentPostsView] initializing...');
      var that = this;

      var posts = this.collection;
      posts.on('add', this.addOne, this);
      posts.on('reset', this.addAll, this);
      // posts.on('all', this.render, this);

      posts.pager(); // makes call to retrieve first set of data from api server
      // this.render();
    },

    addAll: function() {
      // console.log('[RecentPostsView] Collection length:', this.collection.length);
      // console.log('[RecentPostsView] Collection:', this.collection);
      this.collection.each(this.addOne);
    },

    addOne: function(post) {
      var view = new PostExcerptView({ model: post });
      $('#lessons-excerpts').append(view.render().el);
      // $('#lessons-app').append(view.render().el);
    },

    render: function() {
      // console.log('[RecentPostsView] rendering...');
      // this.$el.html('<p>hello from Backbone</p>');
      // var $el = $(this.el);
      // $el.html(this.template());
      return this;
    },

    hide: function() {
      $(this.el).empty();
      // $('#lessons-excerpts').empty();
      return this;
    },

    onClose: function() {
      this.collection.unbind('all', this.render);
    }

  });

  return RecentPostsView;

});