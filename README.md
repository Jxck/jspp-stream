## introduction

JSON pretty print stream


## Usage

```js
{"host":"127.0.0.1","ident":"-","user":"frank","time":"[10/Oct/2000:13:55:36 -0700]","req":"GET /apache_pb.gif HTTP/1.0","status":"200","size":"2326","referer":"http://www.example.com/start.html","ua":"Mozilla/4.08 [en] (Win98; I ;Nav)"}
```

will be

```js
{
  "host": "127.0.0.1",
  "ident": "-",
  "user": "frank",
  "time": "[10/Oct/2000:13:55:36 -0700]",
  "req": "GET /apache_pb.gif HTTP/1.0",
  "status": "200",
  "size": "2326",
  "referer": "http://www.example.com/start.html",
  "ua": "Mozilla/4.08 [en] (Win98; I ;Nav)"
}
```


### from stdin

```sh
$ cat test.json | jspp
```


### from file

```sh
$ jspp /path/to/file.json
```


### from web

```sh
$ jspp http://some.json.com
```


## License

MIT


## Author

Jxck <https://github.com/Jxck>
