// pagination.js

define('views/pagination', function(require) {
  // 'use strict';

  var Backbone = require('backbone')
    , template = require('jade!templates/pagination');
    // , templateDisabled = require('jade!templates/pagination.disabled');

  var PaginationView = Backbone.View.extend({

    tagName: 'div',

    // template: _.template(template()),
    template: {},
    // templateDisabled: _.template(templateDisabled()),

    events: {
      'click button.next-page': 'nextResultPage'
    },

    initialize: function() {
      this.listenTo(this.collection, 'add', this.render);
    },

    render: function() {
      var info = this.collection.info();
      // console.log('[PaginationView] info:', info);
      this.template = _.template(template(info));
      this.$el.html(this.template(info));
      // if (info.currentPage < info.lastPage) {
      //   this.$el.html(this.template(info));
      //   // this.$el.html(_.template(template(info)));
      // } else {
      //   this.$el.html(this.templateDisabled());
      // }
      return this;
    },

    nextResultPage: function(e) {
      e.preventDefault();
      // console.log('fetch next');
      // console.log('collection length:', this.collection.length);
      this.collection.requestNextPage({update: true, remove: false});
      // var info = this.collection.info();
      // if (info.currentPage < info.lastPage) {
      //   this.collection.requestNextPage();
      // } else {
      //   this.render();
      // }
    },

    onClose: function() {
      // console.log('unbind PaginationView');
      this.stopListening();
    }

  });

  return PaginationView;
});