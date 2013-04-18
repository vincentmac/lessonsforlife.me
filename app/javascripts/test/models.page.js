// models.page.js
define(function(require) {
  var chai = require('chai');
  // var assert = chai.assert;
  var expect = chai.expect;
  // var should = chai.should();

  // or

  // var expect = require('chai').expect;

  var Page = require('models/page');

  describe('Models::Page', function(){
    this.page = {};

    describe('Page', function(){
      it('should be a Page model', function(){
        // expect(true).to.be.ok;
        this.page = new Page();
        // console.log('post:', this.post);
        expect(this.page).to.be.an.instanceof(Page);
      });
    });

    describe('Default Values', function() {
      before(function() {
        this.page = new Page();
      });

      after(function() {
        delete this.page;
      });

      describe('id', function() {
        it('should be the default id', function() {
          expect(this.page.get('id')).to.eql('');
        });
      });

      describe('type', function() {
        it('should be the default type', function() {
          expect(this.page.get('type')).to.eql('');
        });
      });

    });


  });

});