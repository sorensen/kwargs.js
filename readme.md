
Kwargs
======

[![Build Status](https://secure.travis-ci.org/sorensen/kwargs.js.png)](http://travis-ci.org/sorensen/kwargs.js) 

Python style keyword arguments for javascript! 

Usage
-----

Node.js

```js
var kwargs = require('kwargs')
```

Browser

```html
<script src="kwargs.min.js"></script>
```


Methods
-------

### kwargs(function, object, …)

Call a given function with a kwarg object. Any extra named params will be added 
to the argument list in the order they are read, followed by any extra arguments.

```js
function letters(a, b, c) {
  return '' + a + b + c
}

kwargs(letters, {b: 'o', c: 'w', a: 'c'}) // 'cow'
kwargs(letters, {b: '-'}) // 'undefined-undefined'
```

Lets try adding some normal arguments now. Normal args are added after the 
last supplied kwarg, never before.

```js
function foo(a, b, c, d) {
  return [a, b, c, d]
}

kwargs(foo, {a: 20, b: 30}, 40, 50) // [20, 30, 40, 50]
kwargs(foo, {d: 5}, 10, 15, 20) // [undefined, undefined, undefined, 5]
```

Magic arguments! If a function is created with an `_args` or `__kwargs` param, this
module will use them as close as possible to python's `*args` and `**kwargs`. The 
main difference here is that the params *must* be named exactly as specified to 
be used.  The `_args` param will be used as an array of all unused arguments. The 
`__kwargs` param will be an object of all unused kwargs passed to the module.

```js
function magic(_args, __kwargs) {}

kwargs(magic, {a: 20, b: 30}, 40, 50)
// _args = [40, 50]
// __kwargs = {a: 20, b: 30}
```

Mix it up:

```js
function meow(cat, milk, __kwargs) {}

kwargs(meow, {cat: 30, milk: 10, blah: 40})
// cat = 30
// milk = 10
// __kwargs = {blah: 40}
```

```js
function meow(a, b, c, _args) {}

kwargs(meow, {a: 30}, 1, 2, 3, 4)
// a = 30
// b = 1
// c = 2
// _args = [3, 4]
```

### kwargs.getNames(function)

Get the argument name array for a given function, mainly for internal use, exposed 
in case you need it for something.

```js
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
