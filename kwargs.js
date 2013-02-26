;(function() {
'use strict';

/*!
 * Module dependencies
 */

var slice = Array.prototype.slice
  , toString = Object.prototype.toString

/**
 * Call a given method with a kwarg object
 *
 * @param {Function} method to call
 * @param {Object} named argument object
 * @param {...} Extra args to be added directly
 * @returns {Any} method results
 */

function kwargs(method, args) {
  return method.apply(this, kwargs.getValues.apply(this, arguments))
}

/**
 * Get an array of transformed arguments
 *
 * @param {Function} method
 * @param {Object} named argument object
 * @param {...} Extra args to be added directly
 * @returns {Array} converted arg array
 */

kwargs.getValues = function(method, args) {
  var names = kwargs.getNames(method)
    , empty = new Array(names.length)
    , start = 1
    , idx

  if (toString.call(args) === '[object Object]') {
    for (var prop in args) {
      idx = names.indexOf('' + prop)
      !!~idx && (empty[idx] = args[prop])
    }
    for (var prop in args) {
      idx = names.indexOf(prop)
      !~idx && empty.push(args[prop])
    }
    start = 2
  }
  return empty.concat(slice.call(arguments, start))
}

/**
 * Get an array of a method's argument names
 *
 * @param {Function} method
 * @returns {Array} arg names
 */

kwargs.getNames = function(method) {
  var str = method.toString()
    , start = str.indexOf('(') + 1
    , stop = str.indexOf(')', start)
    , sub = str.substring(start, stop).replace(/\s+/g, '')

  return sub.split(',')
}

/*!
 * Module exports.
 */

if (typeof exports !== 'undefined') {
  module.exports = kwargs
} else {
  this.kwargs = kwargs
}

}).call(this);