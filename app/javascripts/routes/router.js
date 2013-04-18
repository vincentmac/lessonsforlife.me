// routes/router.js

define('routes/router', function(require) {
  // 'use strict';

  var Backbone = require('backbone')
    , Articles = require('collections/articles')
    , AppView = require('views/app')
    , Post = require('models/post')
    , Posts = require('collections/posts')
    , PostView = require('views/post')
    , RecentPostsView = require('views/posts.recent')

    , Page = require('models/page')
    , Pages = require('collections/pages')
    , PageView = require('views/page')

    , SubmitView = require('views/submit')
    , SocialShareView = require('views/social.share')

    , AppViewManager = require('views/app.view.manager');


  var Router = Backbone.Router.extend({
    routes: {
      '':                 'index',
      // 'testing':          'testing',
      'submit':           'submit',
      ':page':            'page',
      'p/:id(/)(:slug)':  'post',
      's/:hash':          'social'
      // 'p/:id':  'post'
      // 'p/:id/:slug':  'post'
    },

    initialize: function() {
      this.app = new AppViewManager();
      // this.app = _app;
      // console.log(this.app);
      console.log('[router] initializing...');
      this.collections = {
        posts: Posts,
        pages: Pages
      };
      this.views = {
        // app: new AppView(),
        // recentposts: new RecentPostsView({
        //     collection: this.collections.posts
        //   , el: $('#lessons-excerpts')
        // })
      };
      this.bind('all', this.trackPageview);
      // Backbone.history.start({pushState: true});
      // console.log('[router] initialized...');
      // return this;
    },

    testing: function() {
      // console.log('[router] testing');
    },

    index: function() {
      // console.log('[router] load index page');
      // this.resetView('index');
      // this.views.app = new AppView();
      // this.views.app = new AppView({ el: $('#lessons-app') });
      // this.views.app.render();
      var homeView = new AppView({ collection: this.collections.posts });

      // console.log('[router] called render on AppView');
      // var recentPostsView = new RecentPostsView({
      //       collection: this.collections.posts
      //     // , el: $('#lessons-excerpts')
      //   });

      // this.app.showView(recentPostsView);
      this.app.showView(homeView);
      homeView.renderPaginator();
      // homeView.
      // this.views.recentposts.render();
      // this.collections.posts.trigger('reset');
    },

    submit: function() {
      // console.log('[router] load submit page');

      var submitView = new SubmitView({ collection: this.collections.posts });
      this.app.showView(submitView);
      submitView.initForm();
    },

    page: function(slug) {
      var that
        , page
        , renderPage;

      // console.log('page:', slug);

      that = this;

      renderPage = function() {
        that.collections.pages.add(page);
        // that.views.page = new PageView({ model: page});
        var pageView = new PageView({ model: page });
        that.app.showView(pageView);
        // that.views.page = new PageView({ el: $('#lessons-page'), model: page });
        // that.views.page = new PageView({ el: $('#lessons-page'), model: page });
        // that.views.page.render().el;
      };

      // this.resetView('page');

      // first check posts collection if post has already been received from server
      page = this.collections.pages.where({ slug: slug })[0];
      if (page) {
        // console.log('page exists in collections');
        // page.trigger('change');
        renderPage();
      } else {
        // console.log('page does not exist in collection:', page);
        page = new Page({slug: slug});
        page.fetch({success: renderPage});
      }

      // page.on('change', renderPage);
    },

    post: function(id, slug) {
      id = parseInt(id, 10);
      // console.log('post:', id, 'slug:', slug);
      var that
        , post
        , postEvent
        , renderPost;

      that = this;

      renderPost = function() {
        // that.collections.posts.add(post, { silent: true });
        // console.log('[router] post model change:', post);
        that.collections.posts.add(post, { silent: true });

        // testing collection index stuff
        // console.log('index of post in collection:', that.collections.posts.indexOf(post));
        // console.log('collection length:', that.collections.posts.length);
        // console.log('collection info:', that.collections.posts.info());

        // end testing collection index stuff

        var postView = new PostView({ model: post });
        that.app.showView(postView);
        // that.views.post.render().el;
        var url = '/p/' + post.get('id') + '/' + post.get('slug');
        that.updateUrl(url);
      };

      // postEvent = {};
      // _.extend(postEvent, Backbone.Events);

      // this.resetView('post');

      // first check posts collection if post has already been received from server
      post = this.collections.posts.get(id);
      if (post) {
        // console.log('[router] post exists in collections', id);
        // postEvent.trigger('change');
        // post.change();
        renderPost();
        // post.trigger('change');
        // console.log('[router] post', post);
      } else {
        // console.log('[router] post does not exist in collection:', id);
        post = new Post({id: id});
        // post.fetch();
        post.fetch({success: renderPost});
      }

      // post.on('reset', renderPost());
      // postEvent.on('change', renderPost());
      // console.log('[router] post:', JSON.stringify(post));
    },

    trackPageview: function() {
      var url = Backbone.history.getFragment();
      _gaq.push(['_trackPageview', '/' + url]);
      // console.log('Pushed url to Google Analytics:', url);
    },

    social: function(hash) {
      hash = parseInt(hash, 10);
      var data = { shorturl: hash };
      // console.log('social share hash:', hash);
      var socialShareView = new SocialShareView(data);
      // this.app.showView(socialShareView);
      socialShareView.renderDisqus();
    },

    updateUrl: function(url) {
      Backbone.history.navigate(url, { trigger: false, replace: true });
    },

    // resetView no longer used. See AppViewManager to handle clean removal of dom objects.
    resetView: function(view) {
      var that
        , removeApp
        , removePost
        , removePage
        , removeRecentPosts;

        that = this;

        removeApp = function() {
          if (that.views.app) {
            that.views.app.remove();
            delete that.views.app;
          }
        };

        removePost = function() {
          if (that.views.post) {
            that.views.post.remove();
            delete that.views.post;
          }
        };

        removePage = function() {
          if (that.views.page) {
            that.views.page.remove();
            delete that.views.page;
          }
        };

        removeRecentPosts = function() {
          if (that.views.recentposts) {
            that.views.recentposts.remove();
            // delete that.views.recentposts;
          }
        };

      switch (view) {
        case 'index':
          // if (this.views.post) this.views.post.hide();
          // if (this.views.page) this.views.page.hide();
          // if (this.views.recentposts) this.views.recentposts.hide();

          // if (this.views.post) this.views.post.remove();
          // if (this.views.page) this.views.page.remove();
          // if (this.views.recentposts) this.views.recentposts.remove();
          removeRecentPosts();
          removeApp();
          removePost();
          removePage();
          

          // console.log('reset view: ', view);
          $('#app').append('<div id="lessons-app"></div>');
          break;

        case 'post':
          // if (this.views.app) this.views.app.hide();
          // if (this.views.recentposts) this.views.recentposts.hide();
          // if (this.views.page) this.views.page.hide();

          // if (this.views.recentposts) this.views.recentposts.remove();
          // if (this.views.app) this.views.app.remove();
          // if (this.views.page) this.views.page.remove();
          // if (this.views.post) this.views.post.remove();

          removeApp();
          removePost();
          removePage();
          removeRecentPosts();

          // console.log('reset view: ', view);
          $('#app').append('<div id="lessons-post"></div>');
          break;

        case 'page':
          // if (this.views.app) this.views.app.hide();
          // if (this.views.recentposts) this.views.recentposts.hide();
          // if (this.views.post) this.views.post.hide();

          // if (this.views.recentposts) this.views.recentposts.remove();
          // if (this.views.app) this.views.app.remove();
          // if (this.views.page) this.views.page.remove();
          // if (this.views.post) this.views.post.remove();

          removeApp();
          removePost();
          removePage();
          removeRecentPosts();
          // console.log('reset view: ', view);
          $('#app').append('<div id="lessons-page"></div>');
          break;
      }
    }

  });

  // All navigation that is relative should be passed through the navigate
  // method, to be processed by the router.  If the link has a data-bypass
  // attribute, bypass the delegation completely.
  $(document).on("click", "a:not([data-bypass])", function(evt) {
    // Get the anchor href and protcol
    var href = $(this).attr("href");
    var protocol = this.protocol + "//";

    // check for exceptions
    if (href.substring(0, 6) === 'mailto' || href === '/rss') return;

    // Ensure the protocol is not part of URL, meaning its relative.
    if (href && href.slice(0, protocol.length) !== protocol &&
        href.indexOf("javascript:") !== 0) {

      // Stop the default event to ensure the link will not cause a page
      // refresh.
      evt.preventDefault();

      // `Backbone.history.navigate` is sufficient for all Routers and will
      // trigger the correct events.  The Router's internal `navigate` method
      // calls this anyways.
      Backbone.history.navigate(href, true);
      $('.nav-collapse').collapse('hide');
    }
  });

  return Router;
});