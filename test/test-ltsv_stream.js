var assert = require('assert')
  , LtsvStream = require('../')
  ;

suite('ltsv-stream', function() {
  suite('parser', function() {
    test('parse() could parse access.log style LTSV', function() {
      var test_ltsv = [
        'host:127.0.0.1',
        'ident:-',
        'user:frank',
        'time:[10/Oct/2000:13:55:36 -0700]',
        'req:GET /apache_pb.gif HTTP/1.0',
        'status:200',
        'size:2326',
        'referer:http://www.example.com/start.html',
        'ua:Mozilla/4.08 [en] (Win98; I ;Nav)'
      ].join('\t');

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

      var ltsv = new LtsvStream();
      var actual = ltsv.parse(test_ltsv);
      assert.deepEqual(actual, expected);
    });
    test('option {stringify:false} returning json', function() {
      var test_ltsv = [
        'host:127.0.0.1',
        'status:200'
      ].join('\t');

      var expected = {
        host: '127.0.0.1',
        status: '200'
      };

      var ltsv = new LtsvStream({stringify: false});
      var actual = ltsv.parse(test_ltsv);
      assert.deepEqual(actual, expected);
    });
    test('option {stringify:true} returning json string', function() {
      var test_ltsv = [
        'host:127.0.0.1',
        'status:200'
      ].join('\t');

      var expected = {
        host: '127.0.0.1',
        status: '200'
      };

      var ltsv = new LtsvStream({stringify: true});
      var actual = ltsv.parse(test_ltsv);
      assert.deepEqual(actual, JSON.stringify(expected));
    });
  });
});
// fs.createReadStream('test.log').pipe(ltsv_stream).pipe(process.stdout);
