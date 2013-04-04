log = console.error;
var Transform = require('stream').Transform;
var util = require('util');

function JSPP(options) {
  Transform.call(this, options);
  this.data= '';
}

util.inherits(JSPP, Transform);

JSPP.prototype._pp = function(jsonString) {
  return JSON.stringify(JSON.parse(jsonString), null, 2) + "\n";
};

JSPP.prototype._transform = function(chunk, output, cb) {
  chunk = chunk.toString();
  if (chunk) {
    this.data += chunk;
  }
  return cb(null);
};

JSPP.prototype._flush = function(output, cb) {
  if (this.data) {
    output(this._pp(this.data))
  }
  cb(null);
};

module.exports.JSPP = JSPP;
