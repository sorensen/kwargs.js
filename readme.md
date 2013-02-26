
Kwargs
======

[![Build Status](https://secure.travis-ci.org/sorensen/kwargs.js.png)](http://travis-ci.org/sorensen/kwargs.js) 


Usage
-----

Node.js

``` js
var kwargs = require('kwargs')
```

Browser

``` html
<script src="kwargs.min.js"></script>
```


Methods
-------

### kwargs(function, object, …)

Call a given function with a kwarg object. Any extra named params will be added 
to the argument list in the order they are read, followed by any extra arguments.

``` js
function letters(a, b, c) {
  return '' + a + b + c
}
kwargs(letters, {b: 'o', c: 'w', a: 'c'}) // 'cow'
kwargs(letters, {b: '-'}) // 'undefined-undefined'
```

### kwargs.getNames(function)

Get the argument name array for a given function

``` js
function add(first, second, third) {}

kwargs.getNames(add) // ['first', 'second', 'third']
```


Install
-------

With [npm](https://npmjs.org)

```
npm install kwargs
```


License
-------

(The MIT License)

Copyright (c) 2011-2012 Beau Sorensen <mail@beausorensen.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
