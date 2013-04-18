require.config({

  paths: {
    backbone: ['../components/backbone/backbone', '../components/backbone/backbone-min']
  , bootstrap: ['../components/bootstrap/bootstrap/js/bootstrap.min', '../components/bootstrap/bootstrap/js/bootstrap']
  , jade: '../components/require-jade/jade'
  , jquery: ['https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min', '../components/jquery/jquery-1.8.3.min']
  // , jquery: ['../components/jquery/jquery', '../components/jquery/jquery.min']
  , moment: ['../components/moment/min/moment.min', '../components/moment/moment']
  , underscore: ['../components/underscore/underscore-min', '../components/underscore/underscore']
  , 'bootstrap-fileupload': 'vendor/bootstrap-fileupload'
  , 'jquery.fileupload':    'vendor/jquery.fileupload/jquery.fileupload'
  , 'jquery.fileupload-ui': 'vendor/jquery.fileupload/jquery.fileupload-ui'
  , 'jquery.ui.widget':     'vendor/jquery.fileupload/jquery.ui.widget'
  , 'iframe-transport':     'vendor/jquery.fileupload/jquery.iframe-transport'
  // , 'backbone.paginator': ['../components/backbone.paginator/lib/backbone.paginator', '../components/backbone.paginator/dist/backbone.paginator.min', '../components/backbone.paginator/dist/backbone.paginator']
  },

  shim: {
    'backbone': {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    'underscore': {
      deps: ['jquery'],
      exports: '_'
    },
    'bootstrap': {
      deps: ['jquery'],
      exports: 'bootstrap'
    },
    // 'jquery.fileupload': {
    //   deps: ['jquery', 'jquery.ui.widget', 'iframe-transport'],
    //   exports: '$.fn.fileupload'
    // },
    // 'jquery.ui.widget': {
    //   deps: ['jquery', 'iframe-transport']
    // },
    // 'iframe-transport': {
    //   deps: ['jquery']
    // },
    // 'bootstrap-fileupload': ['jquery'],
    // 'jquery.ui.widget': ['jquery'],
    // 'iframe-transport': ['jquery'],
    // 'jquery.fileupload': ['jquery', 'jquery.ui.widget', 'iframe-transport'],

    'app': {
      deps: ['underscore', 'backbone']
    },
    'views/submit': {
      // deps: ['bootstrap-fileupload', 'jquery.fileupload']
      deps: ['bootstrap-fileupload']
    }

  }

});

require(['app', 'bootstrap'], function(App) {
  'use strict';
  window.lessonsApp = new App();
  // console.log('after app initialization');
  Backbone.history.start({pushState: true});
  // console.log(app);
});