// models.lessonShort.js
// Lesson Short URL Model

var LessonShort = require('../models/lessonShort');
// var assert = require('assert');

describe('Model::LessonShort', function() {
  // var lessonShort = new LessonShort();

  // console.log(lessonShort);
  // lessonShort.createShortUrl();
  describe('testing', function() {
    it('should be true', function() {
      // assert.equal(true, true);
      true.should.be.ok;
    });
  });

  describe('default properties', function() {
    var lessonShort = new LessonShort();

    it('should have default empty properties', function() {
      lessonShort.name.should.equal('');
      lessonShort.email.should.equal('');
      lessonShort.age.should.equal(0);
      lessonShort.occupation.should.equal('');
      lessonShort.location.should.equal('');
      lessonShort.lesson1.should.equal('');
      lessonShort.lesson2.should.equal('');
      lessonShort.lesson3.should.equal('');
      lessonShort.fileurl.should.equal('');
      // lessonShort.shorturl.should.equal('');
      lessonShort.tags.should.be.an.instanceOf(Array);
    });
  });

  describe('should set values', function() {
    var lessonShort = new LessonShort({
        name: 'Vincent Mac'
      , date: Date.now
      , email: 'vincent@avant.io'
      , age: 32
      , occupation: 'build stuff'
      , location: 'Calabasas, CA'
      , lesson1: 'This is the first lesson'
      , lesson2: 'This is the second lesson'
      , lesson3: 'This is the third lesson'
      , fileurl: ''
      , shorturl: ''
      , tags: ['tag1', 'tag2']
    });
    // console.log(LessonShort);
    // lessonShort.createShortUrl(8);
    it('should have the values set by the constructor', function() {
      lessonShort.name.should.equal('Vincent Mac');
      lessonShort.email.should.equal('vincent@avant.io');
      lessonShort.age.should.equal(32);
      lessonShort.occupation.should.equal('build stuff');
      lessonShort.location.should.equal('Calabasas, CA');
      lessonShort.lesson1.should.equal('This is the first lesson');
      lessonShort.lesson2.should.equal('This is the second lesson');
      lessonShort.lesson3.should.equal('This is the third lesson');
      lessonShort.fileurl.should.equal('');
      // lessonShort.shorturl.should.equal('');
      // lessonShort.tags.should.eql(['tag1','tag2']);
    });
  });

  describe('should ensure unique shorturl', function() {
    var lesson1;
    var shorturl;

    before(function(done) {
      this.lesson1 = new LessonShort({
          name: 'Vincent Mac'
        , shorturl: 'testing'
        , fileurl: 'testing'
      });

      var model = this.lesson1;
      var saveShortUrl = function(newShortUrl) {
        model.shorturl = newShortUrl;
        model.save(function(err, res) {
          if (err) {
            console.error('mocha error saving:', err);
            return done();
          }
          return done();
        });
      };

      this.lesson1.createShortUrl(6, saveShortUrl);
    });

    after(function(done) {
      this.lesson1.remove(function(err, lesson) {
        if (err) {
          console.error('error:', err);
          return done();
        }
        return done();
      });
    });
    
    describe('save item with existing shorturl', function() {
      it('should only save a unique url fragment', function(done) {
        // console.log('lesson1.shorturl', this.lesson1.shorturl);
        var lesson2 = new LessonShort({
            name: 'Vincent Mac 2'
          , shorturl: 'testing'
          , fileurl: 'testing'
        });

        var model = lesson2;

        var mocksave = function(newShortUrl) {
          model.shorturl = newShortUrl;
          // console.log('mocha lessons2.shorturl:', model.shorturl);
          // console.log('mocha lessons2.shorturl:', model.name);
          done();
        };

        lesson2.createShortUrl(6, mocksave);
        // console.log('mocha lessons2.shorturl:', lesson2.shorturl);
      });
    });
    


  });

});
