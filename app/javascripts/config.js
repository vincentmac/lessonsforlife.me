// config.js

define('config', function() {
  var config = {};

  // config.apiServer = 'http://localhost:8888/api';  // local dev
  // config.apiServer = 'http://lessonsforlifeproject.com/api';  // local dev
  config.apiServer = 'http://api.lessonsforlife.me/v1';  // production

  // config.rootServer = 'http://new.lessonsforlifeproject.com';
  // config.rootServer = 'http://localhost:8888';
  config.rootServer = 'http://lessonsforlife.me';
  config.assetsServer = 'http://static.lessonsforlifeproject.com';

  // Since IE 8 and down cannot support CORS, proxy api requests through rootServer
  // if (!$.support.cors) config.apiServer = config.rootServer + '/api';
  if (!$.support.cors) config.apiServer = '/api';

  // only when using !jade for templates
  // allows use of {{ variableName }}
  _.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
  };

  return config;
});