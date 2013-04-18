// app.view.manager.js
define('views/app.view.manager', function(require) {
  'use strict';
  var Backbone = require('backbone');

  // Create a close function for all Backbone views
  // to prevent Zombie DOM objects.
  // http://lostechies.com/derickbailey/2011/09/15/zombies-run-managing-page-transitions-in-backbone-apps/
  Backbone.View.prototype.close = function(){
    // this.remove();
    // this.unbind();
    if (this.onClose){
      // console.log('[AppViewManager] running onClose');
      this.onClose();
    }
    this.remove();
    this.unbind();
  };

  var AppViewManager = function() {
    this.currentView;
    this.firstLoad = true;
      // console.log('firstLoad:', this.firstLoad);
  };

  AppViewManager.prototype = {
    // currentView
    // collections: {},
    
    showView: function(view) {
      // console.log('[AppViewManager] showView:', view);
      if (this.firstLoad) {
        // console.log('showView firstLoad:', this.firstLoad);
        this.firstLoad = false;
        // return;
      }
      // console.log('after firstLoad check:', this.firstLoad);

      $('#disqus_thread').hide();
      if (this.currentView) {
        // console.log('[AppViewManager] currentView:', this.currentView);
        this.currentView.close();
      }

      this.currentView = view;
      this.currentView.render();

      // console.log('[AppViewManager] showView:', this.currentView.el);

      $('#app').html(this.currentView.el);
      if (this.currentView.renderSocial) this.currentView.renderSocial();
    }
  };

  return AppViewManager;
});