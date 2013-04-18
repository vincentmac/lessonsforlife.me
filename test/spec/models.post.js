// models.post.js
define(function(require) {
  var chai = require('chai');
  // var assert = chai.assert;
  var expect = chai.expect;
  // var should = chai.should();

  // or

  // var expect = require('chai').expect;

  var Post = require('../../app/javascripts/models/post');
  // var post = new Post({id:1});
  console.log(Post);
  describe('Models::Post', function(){
    this.post = {};

    // describe('Post', function(){
    //   it('should be a Backbone model', function(){
    //     // expect(true).to.be.ok;
    //     expect(Post).to.be.a(Object);
    //   });
    // });

    describe('Default Values', function() {
      before(function() {
        this.post = new Post();
      });

      after(function() {
        delete this.post;
      });

      describe('id', function() {
        it('should be the default id', function() {
          expect(this.post.get('id').to.eql(''));
        });
      });

      describe('type', function() {
        it('should be the default type', function() {
          expect(this.post.get('type').to.eql(''));
        });
      });

    });


  });

});