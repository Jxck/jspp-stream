log = console.error;
var assert = require('assert'),
    JSPP = require('../').JSPP,
    fs = require('fs');

var jspp = new JSPP();

suite('jspp', function() {
  suite('stream', function() {
    test('transform every record into json', function(done) {
      var Writable = require('stream').Writable;
      var util = require('util');

      var expected = {
        host: '127.0.0.1',
        ident: '-',
        user: 'frank',
        time: '[10/Oct/2000:13:55:36 -0700]',
        req: 'GET /apache_pb.gif HTTP/1.0',
        status: '200',
        size: '2326',
        referer: 'http://www.example.com/start.html',
        ua: 'Mozilla/4.08 [en] (Win98; I ;Nav)'
      };

      function SPY(options) {
        Writable.call(this, options);
      }
      util.inherits(SPY, Writable);

      SPY.prototype._write = function(chunk, cb) {
        assert.deepEqual(chunk.toString(), JSON.stringify(expected, null, 2) + '\n');
        cb(null);
      };

      var spy = new SPY({decodeString: false});
      fs.createReadStream('test/test.json')
        .pipe(jspp)
        .pipe(spy)
        .on('finish', function() {
          done();
        });
    });
    test('error with invalid json', function(done) {
      fs.createReadStream('test/test.invalid.json')
        .pipe(jspp)
        .on('error', function(err) {
          assert(err.message); // error throwed
          done();
        });
    });
  });
});
