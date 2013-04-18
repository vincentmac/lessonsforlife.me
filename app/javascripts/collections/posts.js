// collections/posts.js
define('collections/posts', function(require) {
  // 'use strict';

  var Backbone = require('backbone');
  // Backbone.Paginator = require('backbone.paginator');
  // console.log('Backbone with Paginator:', Backbone);
  var Post = require('models/post');

  var config = require('config');

  var Posts = Backbone.Collection.extend({

    // Reference to this collection's model
    model: Post,

    initialize: function() {
      this.firstPage = 1;
      this.currentPage = 1;
      this.perPage = 1;
      this.totalPages = 1;
    },

    // Disabled with using paginator
    url: function() {
      return config.apiServer + '/get_recent_posts/?' + $.param({ page: this.currentPage, count: this.perPage });
      // return config.apiServer + '/p/' + this.id + '/?json=1';  // implicit mode
    },

    // Set the comparator to insert models in the collection ordered by `id`
    comparator: function(model) {
      // console.log('[Post Collection] comparator model.get(id):', model.get('id'));
      return model.get('id');
    },

    // paginator_core: {
    //   type: 'GET',
    //   dataType: 'json',
    //   url: function() {
    //     return config.apiServer + '/get_recent_posts/';
    //   }
    // },

    // paginator_ui: {
    //   firstPage: 1,
    //   currentPage: 1,
    //   perPage: 1,
    //   totalPages: 10
    // },

    // server_api: {
    //   'count': function() { return this.perPage; },
    //   'page': function() { return this.currentPage; }
    // },

    parse: function(response) {
      // console.log('[Posts Collection] response:', response);
      // console.log('[Posts Collection] Status:', response.status);
      // console.log('[Posts Collection] Posts:', response.posts);

      this.totalPages = response.pages;  // set total pages available on server
      this.totalRecords = response.count_total;  // set total pages available on server

      // this.totalPages = parseInt(response.pages, 10);  // set total pages available on server
      return response.posts;
    },

    info: function() {
      var info = {
          totalRecords: this.totalRecords || 0
        , currentPage: this.currentPage
        , firstPage: this.firstPage
        , totalPages: Math.ceil(this.totalRecords / this.perPage)
        , lastPage: this.totalPages
        , perPage: this.perPage
        , hasPrevious: false
        , hasNext: false
      };

      if (this.currentPage > 1) {
        info.hasPrevious = this.currentPage - 1;
      }

      if (this.currentPage < info.totalPages) {
        info.hasNext = this.currentPage + 1;
      }

      // info.pageSet = this.setPagination(info);

      this.information = info;
      return info;
    },

    requestNextPage: function ( options ) {
      if ( this.currentPage !== undefined ) {
        this.currentPage += 1;
        // console.log('[requestNextPage] options:', options);
        return this.fetch( options );
      } else {
        var response = new $.Deferred();
        response.reject();
        return response.promise();
      }
    },

    requestPreviousPage: function ( options ) {
      if ( this.currentPage !== undefined ) {
        this.currentPage -= 1;
        return this.update( options );
      } else {
        var response = new $.Deferred();
        response.reject();
        return response.promise();
      }
    }

    // /*
    //  * Get the next (newer) post in the collection
    //  */
    // nextPost: function() {
    //   var currentModel;
    //   // currentModel = this
    // },

    // /*
    //  * Get the previous (older) post in the collection
    //  */
    // previousPost: function() {

    // }

  });

  // invoke immediately so we only have one copy of the collection
  return new Posts();
});
