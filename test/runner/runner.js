// runner.js

require.config({
   paths: {
    backbone: ['../app/components/backbone/backbone', '../app/components/backbone/backbone-min']
  , bootstrap: ['../app/components/bootstrap/bootstrap/js/bootstrap', '../app/components/bootstrap/bootstrap/js/bootstrap-min']
  , jade: '../app/components/require-jade/jade'
  // , jquery: ['https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min', '../components/jquery/jquery.min']
  , jquery: ['../app/components/jquery/jquery', '../app/components/jquery/jquery.min']
  , underscore: ['../app/components/underscore/underscore', '../app/components/underscore/underscore-min']
  , mocha: 'lib/mocha/mocha'
  , chai: 'lib/chai'
  , config: '../app/javascripts/config'
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
    }
  }
});

require(['jquery', 'chai', 'mocha'], function($) {
  // var mocha = require('mocha');
  mocha.setup({ui: 'bdd', globals:[]}); // enter global vars
  // var expect = chai.expect;

  var testRunner = [];
  // testRunner.push('spec/test1');
  // testRunner.push('spec/models.post');
  testRunner.push('spec/models.lessonShort');

  // console.log('hello');
  $(function() {
    require(testRunner, function() {
      // var runner = require('runner/mocha2');
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