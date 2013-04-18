// models.lessonShort.js
define(function(require) {
  var chai = require('chai');
  // var assert = chai.assert;
  var expect = chai.expect;
  // var should = chai.should();

  // or

  // var expect = require('chai').expect;

  var LessonShort = require('../../models/lessonShort');

  console.log(LessonShort);
  describe('Models::LessonShort', function(){
    this.lessonShort = {};

    describe('Default Values', function() {
      before(function() {
        this.lessonShort = new LessonShort();
      });

      after(function() {
        delete this.lessonShort;
      });

      describe('id', function() {
        it('should be the default id', function() {
          // expect(this.post.get('id').to.eql(''));
        });
      });

      describe('type', function() {
        it('should be the default type', function() {
          // expect(this.post.get('type').to.eql(''));
        });
      });

    });


  });

});