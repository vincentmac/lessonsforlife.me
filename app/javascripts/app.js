define('app', function(require) {
  'use strict';
  var Backbone = require('backbone');

  var AppView = require('views/app');
  var PostView = require('views/post');
  var AppRouter = require('routes/router');
  // var AppRouter = require('router');

  // // Create a close function for all Backbone views
  // // to prevent Zombie DOM objects.
  // // http://lostechies.com/derickbailey/2011/09/15/zombies-run-managing-page-transitions-in-backbone-apps/
  // Backbone.View.prototype.close = function(){
  //   this.remove();
  //   this.unbind();
  //   if (this.onClose){
  //     this.onClose();
  //   }
  // };

  var App = function() {
    // var lessonsApp = new AppView();
    // var router = new AppRouter();
    // AppRouter.initialize();
    // this.views.app = new AppView();
    // this.views.app.render();

    // this.views.post = new PostView();

    // this.routes.router = new AppRouter();
    this.routes.router = new AppRouter();
    // console.log('after router start');
    // Backbone.history.start({pushState: true});
  };

  App.prototype = {
    views: {},
    collections: {},
    routes: {}
  };

  return App;
});