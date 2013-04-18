// post.excerpt.js

define('views/post.excerpt', function(require) {
  // 'use strict';

  var Backbone = require('backbone')
    , template = require('jade!templates/post.excerpt')
    , moment = require('moment');

  var PostExcerptView = Backbone.View.extend({
    // el: $('#lessons-post'),
    id: function() {
      return 'post-' + this.model.id;
    },

    tagName: 'article',
    // className: 'lesson-excerpt',
    className: 'post container',

    // template: _.template(template()),
    template: {},

    events: {
      
    },

    initialize: function() {
      // this.model.on('change', this.render, this);
      this.listenTo(this.model, 'change', this.render);
      // this.model.on('destroy', this.remove, this);
    },

    render: function() {
      // var $el = $(this.el);
      var data = this.model.toJSON();
      // this.$el.html(this.template(data));
      data = this.hasImage(data);
      var $el = $(this.el);
      this.template = _.template(template(data));
      $el.html(this.template(data));

      return this;
    },

    hasImage: function(data) {
      var attachments = data.attachments;
      // console.log('[PostExcerptView] hasImage:', attachments.length);
      // console.log('[PostExcerptView] hasImage:', attachments);
      if (attachments.length > 0) {
        data.hasImage = true;
      }
      // console.log('[PostExcerptView] data:', data);
      return data;
    },

    onClose: function() {
      // console.log('[PostExcerptView] onClose');
      // this.model.unbind('change', this.render);
      this.stopListening();
      // this.model.unbind('destroy', this.remove);
    }

  });

  return PostExcerptView;
});