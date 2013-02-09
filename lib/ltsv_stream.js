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
    // TODO: pass to callback this error
    throw new Error('err');
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

module.exports = LtsvStream;
