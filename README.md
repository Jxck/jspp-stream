[![Build Status](https://travis-ci.org/Jxck/ltsv-stream.png?branch=master)](https://travis-ci.org/Jxck/ltsv-stream)

## introduction

transfer stream of [LTSV](http://ltsv.org/) parser


## Usage

```ruby
var LtsvStream = require('ltsv-stream')
  , fs = require('fs');

var ltsv = new LtsvStream({stringify: true});
fs.createReadStream('ltsv-access.log').pipe(ltsv).pipe(process.stdout);
```


## Option

```ruby
var ltsv = new LtsvStream(option);
```

- {stringify: false}: emit json object (default)
- {stringify: true}: emit json string


## License

MIT


## Author

Jxck <https://github.com/Jxck>
