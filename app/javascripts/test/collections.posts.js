// collections.posts.js
define(function(require) {
  var chai = require('chai');
  var expect = chai.expect;

  var Posts = require('collections/posts');
  var Post = require('models/post');
  var config = require('config');


  describe('Collections::Posts', function(){
    this.posts = {};

    it('should add Model instances as objects and arrays', function() {
      this.posts = Posts;
      expect(this.posts.length).to.eql(0);

      this.posts.add(new Post({id:1}));
      expect(this.posts.length).to.eql(1);

      this.posts.add([
        new Post({id:2}),
        new Post({id:3})
      ]);

      expect(this.posts.length).to.eql(3);
    });

    it('should have a url property defined', function() {
      expect(this.posts.url()).to.eql(config.apiServer + '/get_post/?id=' + this.id);
    });


  });

});