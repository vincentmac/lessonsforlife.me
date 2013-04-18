// page.js

define('views/page', function(require) {
  'use strict';

  var Backbone = require('backbone');
  var template = require('jade!templates/page');

  var PageView = Backbone.View.extend({
    // el: $('#lessons-page'),
    tagName: 'article',
    className: 'lesson-page',

    template: _.template(template()),

    events: {

    },

    initialize: function() {
      // this.model.on('change', this.render, this);
      this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
      var $el = $(this.el);
      $el.html(this.template(this.model.toJSON()));
      return this;
    },

    hide: function() {
      this.$el.empty();
      return this;
    },

    onClose: function() {
      // console.log('[PageView] onClose unbind model');
      // this.model.unbind('change', this.render);
      // this.model.stopListening('change', this.render);
      // this.model.stopListening();
      this.stopListening();
    }

  });

  return PageView;
});