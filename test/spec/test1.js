// test1.js
define(function(require) {
  var chai = require('chai');

  var assert = chai.assert;
  var expect = chai.expect;
  var should = chai.should();

  // or
  // var expect = require('chai').expect;

  console.log('Test Module loaded');
  describe('Phantom Mocha Test Framework test', function(){
    
    describe('Test that Mocha and Chai are working', function(){
      it('should return true', function(){
        expect(true).to.be.ok;
      });
    });

  });
});