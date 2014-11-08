// The file was copied from Remy Sharp's awesome server.js
// https://github.com/remy/remysharp.com/blob/master/server.js
// And modified to suit my needs. Thanks Remy!

'use strict';

var http       = require('http');
var st         = require('st');
var glob       = require('glob');
var harp       = require('harp');
var router     = require('router-stupid');
var route      = router();
var moment     = require('moment');
var pkg        = require('./package');
var outputPath = __dirname + '/www';
var port       = process.env.PORT || 9999;
var htmlFiles  = [];
var fourohfour = '';
var mount;


global.moment = moment;

// handling feed URL for feedburner
route.all('/feed/', function(req, res, next){
  req.url = 'feed.xml';
  next();
});

// Handling old blog URLs /{year}/{month}/{slug}
route.all(/^\/([0-9]{4})\/([0-9]{2})\/([a-z0-9\-].*?)(\/)?$/, function (req, res, next) {
  var params = req.params;
  var post = blogs[params[3]];

  if (post && post.date) {
    if (params[4] === '/') {
      res.writeHead(302, { 'location': '/blog/' + req.params[3] });
      res.end();
      return;
    }

    // this allows Harp to pick up the correct post
    req.url = '/blog/' + params[3];
  }
  next();
});

// Handling w/o trailing slash for parent pages
route.all(/^\/(blog|about|portfolio)(\/)?$/, function(req, res, next){

  if(req.params[2] !== '/'){
    res.writeHead(302, { 'location': req.params[1] + '/' });
    res.end();
    return;
  }

  req.url = req.params[0];
  next();
});

var server = function (root) {
  // manually glob all the .html files so that we can navigate
  // without .html on the end of the urls
  glob('**/*.html', {
    cwd: root,
    dot: false
  }, function (er, files) {
    htmlFiles = files.map(function (file) {
      return '/' + file;
    });
  });

  // use st module for static cached routing
  mount = st({
    path: root,
    url: '/',
    index: 'index.html', // server index.html for directories
    passthrough: true // pass through if not found, so we can send 404
  });

  console.log('compilation complete');
};

function run() {
  if (process.env.NODE_ENV === 'production') {
    // lastly...
    route.get('*', function (req, res, next) {

      // we have a file that exists (in `htmlFiles`)
      if (htmlFiles.indexOf(req.url + '.html') !== -1) {
        // then we requested /foo/bar and we know there's a
        // generated file that matches
        console.log(req.url);
        req.url += '.html';
      }

      // if our server is ready, respond using the st module
      // and if it's a 404, respond with `serve404`.
      if (mount) {
        mount(req, res, function serve404() {
          res.writeHead(404);
          res.end(fourohfour);
        });
      } else {
        res.writeHead(404);
        res.end();
      }
    });

    console.log('Running harp-static on ' + port);
    http.createServer(route).listen(port);

    fourohfour = require('fs').readFileSync(outputPath + '/404.html');
    server(outputPath, port);
  } else {
    // this is used for offline development, where harp is
    // rebuilding all files on the fly.
    route.all('*', harp.mount(__dirname));
    route.all('*', function (req, res) {
      req.url = '/404';
      harp.mount(__dirname)(req, res);
    });
    console.log('Running harp-static on: ' + port);
    http.createServer(route).listen(port);

    server(__dirname + '/public');
  }
}

if (process.argv[2] === 'compile') {
  process.env.NODE_ENV = 'production';
  harp.compile(__dirname, outputPath, function(errors){
    if(errors) {
      console.log(JSON.stringify(errors, null, 2));
      process.exit(1);
    }

    process.exit(0);
  });
} else {
  run();
}
