// views/app.js
define('views/app', function(require) {
  // 'use strict';

  // console.log('hello');
  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');

  var template = require('jade!templates/index');
  var config = require('config');

  // var Articles = require('collections/articles');
  // var Article = require('models/article');

  // var Posts = require('collections/posts');
  var PostExcerptView = require('views/post.excerpt');
  var PaginationView = require('views/pagination');


  var AppView = Backbone.View.extend({

    // el: $('#lessons-app'),

    template: _.template(template()),

    initialize: function() {
      // console.log('[AppView] initializing...');
      var that = this
        // , subViews
        , posts;

      this.subViews = [];  // object to keep track of subViews
      // this.paginationView = {};
      // console.log('init subViews:', this.subViews);

      posts = this.collection;
      posts.currentPage = 1;  // re-initialize collection
      // posts.on('add', this.addOne, this);
      this.listenTo(posts, 'add', this.addOne);
      // posts.on('add', _.bind(this.addOne, this));
      // posts.on('reset', this.addAll, this);
      this.listenTo(posts, 'reset', this.addAll);
      // posts.on('all', this.render, this);

      // posts.pager({update: true}); // makes call to retrieve first set of data from api server
      // posts.update({ remove: false }); // makes call to retrieve first set of data from api server
      // posts.fetch({update: true }); // makes call to retrieve first set of data from api server
      posts.fetch(); // makes call to retrieve first set of data from api server
      // this.render();
    },

    addAll: function() {
      // console.log('[AppView] addAll');
      // delete old content first
      // console.log('collection length', this.collection.length);
      // this.collection.each(function(post) { console.log('[AppView] addAll each', post); }, this);
      this.collection.each(this.addOne, this);
      if (this.paginationView) this.paginationView.render();
    },

    addOne: function(post) {
      var view = new PostExcerptView({ model: post });
      // this.subViews['postexcerpt-' + post.cid] = view;
      // this.subViews || (this.subViews = []);
      // console.log('this:', this);
      // console.log('subViews:', this.subViews);

      this.subViews.push(view);
      // console.log('[AppView] addOne:', view.render().el);
      $('#lessons-excerpts').append(view.render().el);
      // $('#lessons-app').append(view.render().el);
      // console.log('subViews:', this.subViews);
      // console.log('collection:', this.collection);
    },

    render: function() {
      // console.log('[AppView ] rendering...');
      var $el = $(this.el);
      $el.html(this.template());
      return this;
    },

    renderPaginator: function() {
      // var view = new PaginationView({ collection: this.collection, el: 'pagination'});
      // var view = new PaginationView({ collection: this.collection});
      this.paginationView = this.paginationView || new PaginationView({ collection: this.collection});
      // this.subViews.push(view);
      // var html = view.render().el;
      // console.log('[AppView] renderPaginator', html);
      // $('#pagination').append(view.render().el);
      $('#pagination').append(this.paginationView.render().el);
      // console.log('[AppView ] rendered pagination...');
      return this;
    },

    hide: function() {
      $(this.el).empty();
      // $('#lessons-excerpts').empty();
      return this;
    },

    onClose: function() {
      // console.log('unbind AppView');
      // this.collection.unbind('add', this.addOne);
      // this.collection.unbind('reset', this.addAll);
      // this.collection.unbind('all', this.render);
      this.stopListening();
      _.each(this.subViews, function(subView) {
        if (subView.close) {
          subView.close();
        }
      });
      if (this.paginationView.close) {
        // console.log('[AppView] PaginationView close');
        this.paginationView.close();
      }
    }

  });

  return AppView;

});