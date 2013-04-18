// views.post.js
define(function(require) {
  var chai = require('chai');
  var expect = chai.expect;

  var Post = require('models/post');
  var PostView = require('views/post');

  describe('Views::Post', function(){
    this.view.post = {};
    this.model.post = {};

    describe('Post', function(){
      it('should be a Post model', function(){
        // expect(true).to.be.ok;
        this.post = new Post();
        // console.log('post:', this.post);
        expect(this.post).to.be.an.instanceof(Post);
      });
    });

    describe('Default Values', function() {
      before(function() {
        this.post = new Post();
      });

      after(function() {
        delete this.post;
      });

      describe('id', function() {
        it('should be the default id', function() {
          expect(this.post.get('id')).to.eql('');
        });
      });

      describe('type', function() {
        it('should be the default type', function() {
          expect(this.post.get('type')).to.eql('');
        });
      });

    });


  });

});