// social.js
// See link for help lazy loading social plugins
// http://www.blackfishweb.com/blog/asynchronously-loading-twitter-google-facebook-and-linkedin-buttons-and-widgets-ajax-bonus

define('views/social', function(require) {
  // 'use strict';

  var Backbone = require('backbone')
    , config = require('config')
    , template = require('jade!templates/social');

  var SocialView = Backbone.View.extend({
    // tagName: '',
    // className: 'lessons-social-inline',

    // template: _.template(template()),
    template: {},

    initialize: function() {

    },

    render: function() {
      // console.log('[SocialView] render social');
      var $el = $(this.el);
      this.template = _.template(template(this.model.toJSON()));
      $el.html(this.template(this.model.toJSON()));
      return this;
    },

    renderPlugins: function() {
      // console.log('[SocialView] renderPlugins');
      this.renderFacebook();
      this.renderTwitter();
      this.renderPlusOne();
      this.renderPinterest();
      this.renderDisqus();
    },

    renderFacebook: function() {
      var $el = $('.lessons-social-facebook');
      // console.log($el);
      // (function(d, s, id) {
      //   var js, fjs = d.getElementsByTagName(s)[0];
      //   if (d.getElementById(id)) return;
      //   js = d.createElement(s); js.id = id;
      //   js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=458239647572623";
      //   fjs.parentNode.insertBefore(js, fjs);
      // })(document, 'script', 'facebook-jssdk');
      // if ($(".fb-like").length > 0) {
        // console.log('[SocialView] renderFacebook fb-like');
        if (typeof (FB) != 'undefined') {
          // FB.init({ status: true, cookie: true, xfbml: true });
          // console.log('[SocialView] FB.XFBML.parse');
          // console.log(FB.XFBML.parse);
          FB.XFBML.parse();
          // FB.login();
        } else {
          // console.log('[SocialView] get FB');
          $.getScript("http://connect.facebook.net/en_US/all.js#xfbml=1", function () {
            FB.init({
              appId:'458239647572623',
              status: true,
              cookie: true,
              xfbml: true ,
              channelUrl: config.rootServer + '/channel.html'
            });
          });
        }
      // }
      // console.log('[SocialView] renderFacebook');

    },

    // renderTwitter: function() {
    //   (function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}})(document,"script","twitter-wjs");
    // console.log('[SocialView] renderTwitter');
    // },
    renderTwitter: function() {
      // $.getScript('http://platform.twitter.com/widgets.js');
      if ($(".twitter-share-button").length > 0) {
        if (typeof (twttr) != 'undefined') {
          twttr.widgets.load();
        } else {
          $.getScript('http://platform.twitter.com/widgets.js');
        }
      }
    },

    renderPlusOne: function() {
      (function() {
        var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
        po.src = 'https://apis.google.com/js/plusone.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
      })();
      // console.log('[SocialView] renderPlusOne');
    },

    renderPinterest: function() {
      // console.log('[SocialView] renderPinterest');
      $.ajax({ url: 'http://assets.pinterest.com/js/pinit.js', dataType: 'script', cache:true});
    },

    renderDisqus: function() {
      $('#disqus_thread').show();
      // var disqus_no_style = true;
      var disqus_shortname = 'lessonsforlife'; // Required - Replace example with your forum shortname
      var disqus_identifier = this.model.get('id');
      var disqus_title = this.model.get('title_plain');
      var disqus_url = config.rootServer + '/p/' + this.model.get('id');
      var disqus_developer = 1; // or 1 based on if you're looking to skip URL authentication

      // var disqus_api_key = 'p1vOXdmPctlJWYx1GLwlovCZbJC9hnXPlur4VLWB86eAp3Te2BZDb1kFoNuLO15J';
      if (typeof (window.DISQUS) != 'undefined') {
        // console.log('DISQUS:', DISQUS);
        window.DISQUS.reset({
          reload: true,
          config: function () {
            this.page.identifier = disqus_identifier;
            this.page.url = disqus_url;
          }
        });
      } else {
        (function() {
            var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
            dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
        })();
      }

    },

    onClose: function() {
      // console.log('[SocialView] onClose');
      this.stopListening();
    }

  });

  return SocialView;
});