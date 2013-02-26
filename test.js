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

  it('should preserve empty arguments', function() {
    var one = function(a, b, c, d) {
      ase(4, arguments.length)
      ase(b, 'hi')
    }
    kwargs(one, {b: 'hi'})

    var two = function(a, b, c, d) {
      ase(4, arguments.length)
      ase(d, 'meow')
    }
    kwargs(two, {d: 'meow'})
  })

  it('should add extra arguments', function() {
    function len (a,  b,  c) {
      return arguments.length
    }
    ase(5, kwargs(len, {a: 1, b: 2, c: 3, d: 4, e: 5}))
    ase(5, kwargs(len, {}, 10, 20))
    ase(4, kwargs(len, {hey: 'there'}))
  })

  it('should use keyword args first, then normal args', function() {
    function last (a, b) {
      return arguments[arguments.length - 1]
    }
    ase(20, kwargs(last, {a: 10, b: 15, c: 20}))
    ase('hi', kwargs(last, {oh: 'hi'}))
    ase(true, kwargs(last, {the: 'cow'}, true))
  })
})

