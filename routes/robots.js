// robots.js
// render page for robots and social media


module.exports = function robots(req, res, next) {
  'use strict';
  var allowedRobotUserAgents
    , userAgent
    , _
    , isWhiteListedUA;

  _ = {};

  allowedRobotUserAgents = [
      /googlebot/i
    , /facebookexternalhit/i
    , /bingbot/i
    , /linkedinbot/i
    , /twitterbot/i
  ];

  // _.find function modified from Underscore.js 1.4.3
  _.find = function(obj, iterator, context) {
    var result;
    obj.some(function(value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  isWhiteListedUA = function(ua) {
    if (userAgent.search(ua) !== -1) return true;
    return false;
  };

  userAgent = req.headers['user-agent'].toLowerCase();

  if(_.find(allowedRobotUserAgents, isWhiteListedUA)) {
    console.log('User agent render meta');
    // render header data for social plugin scrapers and robots
    next();
  } else {
    // console.log('Render regular site');
    next();
  }

};