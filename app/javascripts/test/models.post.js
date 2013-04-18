// models.post.js
define(function(require) {
  var chai = require('chai');
  // var assert = chai.assert;
  var expect = chai.expect;
  // var should = chai.should();

  // or

  // var expect = require('chai').expect;

  var Post = require('models/post');

  describe('Models::Post', function(){
    this.post = {};

    describe('Model Instance', function(){
      it('should be a Post model', function(){
        // expect(true).to.be.ok;
        this.post = new Post();
        // console.log('post:', this.post);
        expect(this.post).to.be.an.instanceof(Post);
      });
    });

    describe('Default Attributes', function() {
      before(function() {
        this.post = new Post();
      });

      after(function() {
        delete this.post;
      });

      describe('Default attributes for empty Post', function() {
        it('should create an empty model with the default values', function() {
          expect(this.post.get('id')).to.eql('');
          expect(this.post.get('type')).to.eql('');
          expect(this.post.get('slug')).to.eql('');
          expect(this.post.get('url')).to.eql('');
          expect(this.post.get('status')).to.eql('');
          expect(this.post.get('title')).to.eql('');
          expect(this.post.get('title_plain')).to.eql('');
          expect(this.post.get('content')).to.eql('');
          expect(this.post.get('excerpt')).to.eql('');
          expect(this.post.get('date')).to.eql('');
          expect(this.post.get('modified')).to.eql('');
          expect(this.post.get('categories')).to.eql([]);
          expect(this.post.get('tags')).to.eql([]);
          expect(this.post.get('author')).to.eql({
              id: ''
            , slug: ''
            , name: ''
            , first_name: ''
            , last_name: ''
            , nickname: ''
            , url: ''
            , description: ''
          });
          expect(this.post.get('comments')).to.eql([]);
          expect(this.post.get('attachments')).to.eql([]);
          expect(this.post.get('comment_count')).to.eql(0);
          expect(this.post.get('comment_status')).to.eql('');
        });
      });


    });


  });

});