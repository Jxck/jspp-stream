log = console.log;
var Transform = require('stream').Transform
, util = require('util')
  , fs = require('fs');


function LtsvStream(options) {
  Transform.call(this, options);
  this.stringify = false;
  if (options && options.stringify) {
    this.stringify = options.stringify;
  }
  this.line = '';
}

util.inherits(LtsvStream, Transform);

LtsvStream.prototype._getField = function(field, result) {
  if (!field.match(/:/)) {
    throw new Error('eeeeeeeeeerrrrrrrrrrrroooooooooooorrrrrrrrrrrr');
  }

  result[RegExp.leftContext] = RegExp.rightContext;
};

LtsvStream.prototype.parse = function(record) {
  var result = {};
  record = record.split('\t');

  for (var i = 0; i < record.length; i++) {
    this._getField(record[i], result);
  }
  return result;
};

LtsvStream.prototype._transform = function(chunk, output, cb) {
  chunk = chunk.toString();
  if (chunk) {
    this.line += chunk;
    while (this.line.match(/\r?\n/)) {
      var record = RegExp.leftContext;
      this.line = RegExp.rightContext;
      record = this.parse(record);
      if (this.stringify) {
        record = JSON.stringify(record);
      }
      output(record);
    }
  }
  cb(null);
};

var ltsv_stream = new LtsvStream({ stringify: true });


fs.createReadStream('test.log').pipe(ltsv_stream).pipe(process.stdout);


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

//ltsv_stream.parse(test_ltsv);
