// submit.js

define('views/submit', function(require) {

  var Backbone = require('backbone')
    , template = require('jade!templates/submit')
    , templateComplete = require('jade!templates/submit.complete')
    , SocialShareView = require('views/social.share')
    , moment = require('moment');

  // require('iframe-transport');
  // require('jquery.ui.widget');
  require('jquery.fileupload');

  var SubmitView = Backbone.View.extend({
    template: _.template(template()),
    
    tagName: 'section',

    events: {
      'click button#submit-lesson': 'onSubmit'
      // 'click button#upload-lesson': 'onUpload'
      // 'change input#input-file':    'onFileChange'
    },

    initialize: function() {
      this.data = {};
      this.deferredData = {};
    },

    render: function() {
      var $el = $(this.el);
      $el.html(this.template());
      return this;
    },

    renderComplete: function(data) {
      var $el = $(this.el);
      // console.log('render data:', data);
      this.template = _.template(templateComplete(data));
      $el.html(this.template(data));
      this.renderSocialShare(data);
    },

    renderSocialShare: function(data) {
      // console.log('[Submit] render social');
      var socialShareView = new SocialShareView(data);
      $('.lessons-social-vertical').append(socialShareView.render().el);
      // $('#lessons-social-inline').append(socialShareView.render().el);
      socialShareView.renderPlugins();
    },

    /**
     * Initialize fileupload form
     */

    initForm: function() {
      this.fileupload();
    },

    /**
     * Handle all verification before submitting to server
     */

    onSubmit: function(e) {
      var that = this;
      e.preventDefault();
      // console.log('submit button pressed');
      this.resetErrors();
      this.getFormData();

      //validate form
      if(this.verifyAllInputs()) {
        // console.log('data.filename', this.data.filename);
        // console.log('data.filename', this.data.filename);
        if (this.data.filename) {
          this.deferredData.submit();
        } else {
          this.submitNewLesson();
        }
      }

      // $('#submit-form').append('<p>submit clicked: button is now be disabled.  I will update this to put a message sent notice</p>');
    },


    /**
     * Reset form errors
     */

    resetErrors: function() {
      // Remove error class
      this.$('#control-name').removeClass('error');
      this.$('#control-email').removeClass('error');
      this.$('#control-age').removeClass('error');
      this.$('#control-occupation').removeClass('error');
      this.$('#control-location').removeClass('error');
      this.$('#control-lesson1').removeClass('error');
      this.$('#control-lesson2').removeClass('error');
      this.$('#control-lesson3').removeClass('error');
      this.$('#control-file').removeClass('error');
      $('#error-wrapper').fadeOut().removeClass('alert alert-error');

      // Reset inline help comments
      this.$('#control-name .help-inline').empty();
      this.$('#control-email .help-inline').empty();
      this.$('#control-age .help-inline').empty();
      this.$('#control-occupation .help-inline').empty();
      this.$('#control-location .help-inline').empty();
      this.$('#control-lesson1 .help-inline').empty();
      this.$('#control-lesson2 .help-inline').empty();
      this.$('#control-lesson3 .help-inline').empty();
      this.$('#control-file .help-inline').empty();
      $('#error-wrapper').empty();
    },

    /**
     * Display an error `message` for form validation
     *
     * @param {Array} message
     */

    flashError: function(message) {
      var errorMessage = this.messageGrammar(message);
      // var alertMsg = '<button type="button" class="close" data-dismiss="alert">×</button>';
      var alertMsg = '<h3>Oh snap! <small class="alert-error"> ' + errorMessage + '</small></h3>';
      $('#error-wrapper').addClass('alert alert-error').fadeIn();
      $('#error-wrapper').html(alertMsg);
    },

    /**
     * Format error `message` array into a grammatically correct sentance
     *
     * @param {Array} message
     * @return {String}
     */

    messageGrammar: function(message) {
      if (message.length === 0) { return false; }
      if (message.length === 1) { return message[0]; }
      if (message.length === 2) {
        return message.join(' and ');
      }
      if (message.length > 2) {
        var last = message.pop();
        message.push('and ' + last);
        return message.join(', ');
      }
    },

    /**
     * Verify that user has entered all form inputs
     *
     * @param {Object} data
     * @return {Boolean}
     */

    verifyAllInputs: function() {
      var message = [];
      var emptyMessage = 'You can\'t leave this empty';
      
      // Verify form input before submit
      if (!this.data.name) {
        this.$('#control-name').addClass('error');
        this.$('#control-name .help-inline').text(emptyMessage);
        message.push('name');
      }
      if (!this.data.email) {
        this.$('#control-email').addClass('error');
        this.$('#control-email .help-inline').text(emptyMessage);
        message.push('email');
      }
      if (!this.data.age) {
        this.$('#control-age').addClass('error');
        this.$('#control-age .help-inline').text(emptyMessage);
        message.push('age');
      }
      if (!this.data.occupation) {
        this.$('#control-occupation').addClass('error');
        this.$('#control-occupation').addClass('error');
        this.$('#control-occupation .help-inline').text(emptyMessage);
        message.push('occupation');
      }
      if (!this.data.location) {
        this.$('#control-location').addClass('error');
        this.$('#control-location .help-inline').text(emptyMessage);
        message.push('location');
      }
      if (!this.data.lesson1) {
        this.$('#control-lesson1').addClass('error');
        this.$('#control-lesson1 .help-inline').text(emptyMessage);
        message.push('lesson one');
      }
      if (!this.data.lesson2) {
        this.$('#control-lesson2').addClass('error');
        this.$('#control-lesson2 .help-inline').text(emptyMessage);
        message.push('lesson two');
      }
      if (!this.data.lesson3) {
        this.$('#control-lesson3').addClass('error');
        this.$('#control-lesson3 .help-inline').text(emptyMessage);
        message.push('lesson three');
      }
      if (!this.data.filename) {
        this.$('#control-file').addClass('error');
        this.$('#control-file .help-inline').text(emptyMessage);
        message.push('an image to upload');
      }
      if (message.length > 0) {
        message[0] = 'Missing ' + message[0];
        this.flashError(message);
        return false;
      }
      return true;
    },

    /**
     * Helper function to get form `data`
     *
     * @return {Object} data
     */

    getFormData: function() {
      this.data.name = this.$('#input-name').val().trim();
      this.data.email = this.$('#input-email').val().trim();
      this.data.age = this.$('#input-age').val().trim();
      this.data.occupation = this.$('#input-occupation').val().trim();
      this.data.location = this.$('#input-location').val().trim();
      this.data.lesson1 = this.$('#input-lesson1').val().trim();
      this.data.lesson2 = this.$('#input-lesson2').val().trim();
      this.data.lesson3 = this.$('#input-lesson3').val().trim();
      this.data.fileurl = this.$('#input-file-url').val();
      // console.log('got form data');
      return;
    },

    /**
     * Helper function to get form `data`
     *
     * @return {Object} data
     */

    getS3Credentials: function(filename) {
      var that = this;
      // var timeNow = moment().format('YYYY-MM-DDTHH-mm');
      // // filename = '/uploads/' + timeNow + '-' + filename;
      // filename = timeNow + '-' + filename;
      // console.log('[getS3Credentials] filename:', filename);

      $.get('/submit/s3Credentials/' + filename)
        .error(function(err) {
          console.log('error fetching credentials:', err);
        })
        .success(function(s3Credentials) {
          // console.log('successfully got credentials:', s3Credentials);
          that.updateS3Form(s3Credentials);
          // that.submitS3Upload(s3Credentials);
          // return callback();
          return;
        });
    },

    // submitS3Upload: function(s3Credentials) {
    //   console.log('[submitS3Upload] time to upload image to s3:', s3Credentials);
    //   console.log('time to upload image to s3:', this.data);
    //   $('input[name=key]').val('uploads/' + this.data.uuidfilename);
    //   $('input[name=AWSAccessKeyId]').val(s3Credentials.s3Key);
    //   $('input[name=policy]').val(s3Credentials.s3PolicyBase64);
    //   $('input[name=signature]').val(s3Credentials.s3Signature);
    //   $('input[name=Content-Type]').val(s3Credentials.mimetype);
    // },

    /**
     * Helper function to get form `data`
     *
     * @return {Object} data
     */

    getFileName: function(filename) {
      // this.data.filename = this.$('#input-file').val().toLowerCase().replace(/.+[\\\/]/, "").replace(/[_\s]/g, '-');
      this.data.filename = filename.toLowerCase().replace(/.+[\\\/]/, "").replace(/[_\s]/g, '-');
      var timeNow = moment().format('YYYY-MM-DDTHH-mm');
      this.data.uuidfilename = timeNow + '-' + this.data.filename;
      // console.log('this.data after', this.data);
    },

    /**
     * Helper function to get form `data`
     *
     * @return {Object} data
     */

    updateS3Form: function(s3Credentials) {
      // console.log('[updateS3Form] time to upload image to s3:', s3Credentials);
      $('input[name=key]').val('uploads/' + this.data.uuidfilename);
      $('input[name=AWSAccessKeyId]').val(s3Credentials.s3Key);
      $('input[name=policy]').val(s3Credentials.s3PolicyBase64);
      $('input[name=signature]').val(s3Credentials.s3Signature);
      $('input[name=Content-Type]').val(s3Credentials.mimetype);
    },

    /**
     * Helper function to get form `data`
     *
     * @return {Object} data
     */

    submitNewLesson: function() {
      var that = this;
      this.getFormData();
      $.post('submit', this.data, 'json')
      .success(function(data) {
        // console.log('successfully submitted form:', data);
        that.renderComplete(data);
      }).error(function(err) {
        console.log('error submitting form:', err);
      });
    },

    /**
     * Helper function to get form `data`
     *
     * @return {Object} data
     */
    // submitDeferred: function(data) {
    //   var dfr = $.Deferred();
    //   (function(data) {
    //     data.submit();
    //     // this.e.stopPropagation();
    //     dfr.resolve();
    //   })(data);
    //   return dfr.promise();
    // },

    /**
     * Helper function to get form `data`
     *
     *
     */

    fileupload: function() {
      var that = this;

      $('#s3-upload').fileupload({
        // Uncomment the following to send cross-domain cookies:
        //xhrFields: {withCredentials: true},
        url: 'https://s3-us-west-1.amazonaws.com/static.lessonsforlifeproject.com'
      });

      $('#s3-upload').fileupload({
        // url: form.attr('action'),
        url: 'https://s3-us-west-1.amazonaws.com/static.lessonsforlifeproject.com',
        // forceIframeTransport: true,
        type: 'POST',
        // autoUpload: true,
        dataType: 'xml',
        add: function(event, data) {
          that.getFileName(data.files[0].name);
          that.getS3Credentials(data.files[0].name);
          that.deferredData = data;
        },
        send: function(e, data) {
          $('.progress').fadeIn();
        },
        progress: function(e, data) {
          var percent = Math.round((e.loaded / e.total) * 100);
          $('.bar').css('width', percent + '%');
        },
        fail: function(e, data) {
          console.log('failed to upload to s3 error:', e);
          console.log('failed to upload to s3 data:', data);
        },
        success: function(data) {
          // var url = $(data).find('Location').text();
          var url = 'http://' + $(data).find('Bucket').text() + '/' +$(data).find('Key').text();
          // var url = 'http://static.lessonsforlifeproject.com/uploads/' + that.data.uuidfilename;
          $('#input-file-url').val(url);
          // console.log('success: now submit email data:', data);
          // console.log('success: this.data', that.data);

          that.data.fileurl = url;
          // that.data.fileurl = 'http://static.lessonsforlifeproject.com/uploads/' + that.data.uuidfilename;

        },
        done: function(event, data) {
          $('.progress').fadeOut(300, function() {
            $('bar').css('width', 0);
            // then do email submit of rest of form.
            // console.log('done: now submit email');
          });
          that.submitNewLesson();

        }
      });

      $('.progress').hide();
    },

    /**
     * Helper function to cleanly remove view from DOM
     * and prevent memory leaks
     */

    onClose: function() {
      // console.log('unbind submit view');
      $('#s3-upload').fileupload('destroy');
      this.stopListening();
    }
  });

  return SubmitView;
});