// pages.js
define('collections/pages', function(require) {
  'use strict';

  var Backbone = require('backbone');
  var Page = require('models/page');

  var config = require('config');

  var Pages = Backbone.Collection.extend({

    // Reference to this collection's model
    model: Page,

    url: function() {
      return config.apiServer + '/get_page/?slug=' + this.slug;
      // return config.apiServer + '/p/' + this.id + '/?json=1';  // implicit mode
    },

    parse: function(response) {
      console.log('response:', response);
      console.log('Status:', response.status);
      console.log('Page:', response.page);
      return response.page;
    }

  });

  // invoke immediately so we only have one copy of the collection
  return new Pages();
});