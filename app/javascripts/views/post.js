// post.js

define('views/post', function(require) {
  // 'use strict';

  var Backbone = require('backbone')
    , template = require('jade!templates/post')
    , SocialView = require('views/social')
    , moment = require('moment');

  var PostView = Backbone.View.extend({
    // el: $('#lessons-post'),
    tagName: 'article',
    className: 'lesson-post',

    // template: _.template(template()),
    template: {},

    events: {

    },

    initialize: function() {
      this.socialView = {};
      // this.model.on('change', this.render, this);
      this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
      // console.log('[PostView] render post');
      var $el = $(this.el);
      var data = this.model.toJSON();
      this.template = _.template(template(data));
      // var dateMoment = moment(data.date, "YYYY-MM-DD HH:mm:ss");
      // var formattedDate = dateMoment.format('MMMM Do, YYYY');
      // data.formattedDate = formattedDate;
      // console.log('[PostView] post data:', data);
      $el.html(this.template(data));
      // console.log('[PostView] render post html:', $el.html());
      this.updateImageUrls();
      return this;
    },

    updateImageUrls: function() {
      // Breakpoints
      // 1200 min for full desktop or 2x
      // 980 Desktop
      // 768 min to 979 max Portrait Tablet to Landscape and Desktop
      // 767 max Landscape phone to portrait tablet
      // 480 max Landscape phones (iPhone OG/3G/3GS)

      // attachments[].images
      var $el
        , images
        , width
        , attachments
        , updateImage;

      $el = $(this.el);
      images = $el.find('img');
      attachments = this.model.get('attachments');
      width = $(window).width();

      updateImage = function(image) {
        var newImage;
        // console.log('image', image);
        // console.log('image src', image.src);
        // console.log('image width', image.width);
        // console.log('image height', image.height);
        // console.log('window width', width);
        // console.log('attachments:', attachments);

        newImage = _.find(attachments, function(attachment) {
          return attachment.url == image.src;
        });

        // console.log('new image:', newImage);

        switch (true) {
          case (width >= 980):
            // console.log('full', newImage.images.full);
            image.src = newImage.images.full.url;
            break;

          // Since Snow only wants to display images rather than actual text,
          // which is far more readable/legible, disable using medium images
          case (width < 980):
            // console.log('large', newImage.images.large);
            image.src = newImage.images.large.url;
            break;

          // case ((width < 980) && (width >= 768)):
          //   console.log('large', newImage.images.large);
          //   image.src = newImage.images.large.url;
          //   break;

          // case (width < 768):
          //   console.log('medium', newImage.images.medium);
          //   image.src = newImage.images.medium.url;
          //   break;
        }

      };
      
      // console.log('[PostView] updateImageUrls html:', $el.html());
      
      // console.log('images', images);
      _.each(images, function(image) { updateImage(image); });
    },

    renderSocial: function() {
      // console.log('[PostView] render social');
      this.socialView = new SocialView({ model: this.model });
      $('#lessons-social-inline').append(this.socialView.render().el);
      this.socialView.renderPlugins();
    },

    hide: function() {
      this.$el.empty();
      return this;
    },

    onClose: function() {
      // console.log('[PostView] onClose unbind model');
      // this.model.unbind('change', this.render);
      // this.model.stopListening('change', this.render);
      // this.model.stopListening();
      if (this.socialView.close) this.socialView.close();
      this.stopListening();
    }

  });

  return PostView;
});