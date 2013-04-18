// runner.js

require.config({
   paths: {
    backbone: ['../components/backbone/backbone', '../components/backbone/backbone-min']
  , bootstrap: ['../components/bootstrap/bootstrap/js/bootstrap', '../components/bootstrap/bootstrap/js/bootstrap-min']
  , jade: '../components/require-jade/jade'
  , jquery: ['../components/jquery/jquery', '../components/jquery/jquery.min']
  , underscore: ['../components/underscore/underscore', '../components/underscore/underscore-min']
  , mocha: '../../test/lib/mocha/mocha'
  , chai: '../../test/lib/chai'
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
    'mocha': {
      deps: ['jquery', 'chai']
    },
    'config': {
      deps: ['underscore']
    }
  }
});

require(['jquery', 'chai', 'mocha'], function($) {
  mocha.setup({ui: 'bdd', globals:[]}); // enter global vars

  var testRunner = [];
  // Add additional tests here
  testRunner.push('test/models.post');
  testRunner.push('test/collections.posts');
  // testRunner.push('test/views.post');
  // testRunner.push('test/models.page');
  // testRunner.push('test/collections.pages');



  $(function() {
    require(testRunner, function() {
      (function() {
        var runner = mocha.run();

        if(!window.PHANTOMJS) return;

        runner.on('test', function(test) {
          sendMessage('testStart', test.title);
        });

        runner.on('test end', function(test) {
          sendMessage('testDone', test.title, test.state);
        });

        runner.on('suite', function(suite) {
          sendMessage('suiteStart', suite.title);
        });

        runner.on('suite end', function(suite) {
          if (suite.root) return;
          sendMessage('suiteDone', suite.title);
        });

        runner.on('fail', function(test, err) {
          sendMessage('testFail', test.title, err);
        });

        runner.on('end', function() {
          var output = {
            failed  : this.failures,
            passed  : this.total - this.failures,
            total   : this.total
          };

          sendMessage('done', output.failed,output.passed, output.total);
        });

        function sendMessage() {
          var args = [].slice.call(arguments);
          alert(JSON.stringify(args));
        }
      })();

    });
  });



});