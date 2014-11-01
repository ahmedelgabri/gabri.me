'use strict';

var harp = require('harp');
var moment = require('moment');
var outputPath = __dirname + '/www';
var action = process.argv[2];


// https://github.com/remy/remysharp.com/blob/master/server.js#L22-L26
global.moment = moment;

if ( action === '--compile') {
  harp.compile( __dirname, outputPath, function(err) {
      if (err) {
          JSON.stringify(err, null, 2);
          process.exit(1);
      }

      process.exit(0);
  });
} else {
  harp.server( __dirname, { port: process.env.PORT || 9000 }, function(err) {
      if (err) {
          JSON.stringify(err, null, 2);
          process.exit(1);
      }
  });
}



