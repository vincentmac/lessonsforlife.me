// collections.pages.js
define(function(require) {
  var chai = require('chai');
  var expect = chai.expect;

  var Pages = require('collections/pages');

  describe('Collections::Pages', function(){
    this.pages = {};

    describe('Pages', function(){
      it('should be a Pages Collection', function(){
        // expect(true).to.be.ok;
        this.pages = Pages;
        // console.log('post:', this.post);
        // expect(this.pages).to.be.an.instanceof(Pages);
      });
    });

    // describe('Default Values', function() {
    //   before(function() {
    //     this.posts = new Post();
    //   });

    //   after(function() {
    //     delete this.posts;
    //   });

    //   describe('id', function() {
    //     it('should be the default id', function() {
    //       expect(this.post.get('id')).to.eql('');
    //     });
    //   });

    //   describe('type', function() {
    //     it('should be the default type', function() {
    //       expect(this.post.get('type')).to.eql('');
    //     });
    //   });

    // });


  });

});