[![Build Status](https://travis-ci.org/Jxck/ltsv-stream.png?branch=master)](https://travis-ci.org/Jxck/ltsv-stream)

## introduction

transfer stream of [LTSV](http://ltsv.org/) parser


## Usage

```js
var ltsv2json = require('ltsv-stream').ltsv2json
  , fs = require('fs');

var ltsv = new ltsv2json({stringify: true});
fs.createReadStream('ltsv-access.log').pipe(ltsv).pipe(process.stdout);
```

you can also use parse() for parse LTSV format record into josn.

```js
var ltsv = new ltsv2json();
var record = ['host:127.0.0.1', 'ident:-'].join('\t');
ltsv.parse(record); // { host: '127.0.0.1, ident: '-' }
```


## Option

```js
var ltsv = new ltsv2json(option);
```

- {stringify: false}: emit json object (default)
- {stringify: true}: emit json string


## License

MIT


## Author

Jxck <https://github.com/Jxck>
