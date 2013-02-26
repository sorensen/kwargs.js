'use strict';

var kwargs = require('./index')
  , assert = require('assert')
  , ase = assert.strictEqual
  , ade = assert.deepEqual


describe('Kwargs', function() {
  it('should get the correct arg names', function() {
    function hi(meow, bark, quack) {}
    var names = kwargs.getNames(hi)
    ase(names[0], 'meow')
    ase(names[1], 'bark')
    ase(names[2], 'quack')
  })

  it('should call the method with the same params in any order', function() {
    function test(one, two, three, four) {
      ase(4, arguments.length)
      return '' + one + two + three + four
    }
    ase('1234', kwargs(test, {one: 1, four: 4, three: 3, two: 2}))
    ase('1234', kwargs(test, {two: 2, one: 1, three: 3, four: 4}))
  })

  it('should preserve leading empty kwargs', function() {
    var one = function(a, b, c, d) {
      ase(2, arguments.length)
      ase(b, 'hi')
    }
    kwargs(one, {b: 'hi'})

    var two = function(a, b, c, d) {
      ase(4, arguments.length)
      ase(d, 'meow')
    }
    kwargs(two, {d: 'meow'})
  })

  it('should add extra args', function() {
    function len (a,  b,  c) {
      return arguments.length
    }
    ase(2, kwargs(len, {}, 10, 20))
    ase(3, kwargs(len, 1, 2, 3))
  })

  it('should not add extra kwargs', function() {
    function len (a,  b,  c) {
      return arguments.length
    }
    ase(3, kwargs(len, {a: 1, b: 2, c: 3, d: 4, e: 5}))
    ase(0, kwargs(len, {}))
    ase(0, kwargs(len, {hey: 'there'}))
  })

  it('should use keyword args first, then normal args', function() {
    function last (a, b, c) {
      return arguments[arguments.length - 1]
    }
    ase(20, kwargs(last, {a: 10, b: 15, c: 20}))
    ase('hi', kwargs(last, {b: 3}, 'hi'))
    ase(undefined, kwargs(last, {oh: 'hi'}))
    ase(true, kwargs(last, {the: 'cow'}, true))
  })

  it('should place args correctly when missing kwargs', function() {
    function hi (a, b, c) {
      ase(a, undefined)
      ase(b, undefined)
      ase(c, 10)
    }
    kwargs(hi, {c: 10}, 1, 2)

    function hey (a, b, c, d) {
      ase(a, undefined)
      ase(b, 10)
      ase(c, 1)
      ase(d, 2)
    }
    kwargs(hey, {b: 10}, 1, 2)
  })

  it('should populate the `__kwargs` param if present', function() {
    function magic(a, b, __kwargs) {
      ase(3, a)
      ase('hey', b)
      return __kwargs
    }
    var params = {
      a: 3
    , b: 'hey'
    , something: true
    , cow: 'milk'
    }
    ade(kwargs(magic, params), {
      something: true
    , cow: 'milk'
    })
  })

  it('should populate the `_args` param if present', function() {
    function magic (foo, bar, _args) {
      return _args
    }
    var params = {
      bar: 3
    , b: 'hey'
    }
    ade([1, 2], kwargs(magic, params, 1, 2))
  })

  it('should use both `_args` and `__kwargs` together', function() {
    function lol (_args, __kwargs) {
      ase(2, arguments.length)
      ase(3, __kwargs.c)
      ase('a', _args[0])
      ase('d', _args[3])
    }
    kwargs(lol, {a: 1, b: 2, c: 3}, 'a', 'b', 'c', 'd')
  })
})
