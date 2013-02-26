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

kwargs.getValues = function(method, obj) {
  var names = kwargs.getNames(method)
    , list = [], start = 1, idx
    , aidx = names.indexOf('_args')
    , kidx = names.indexOf('__kwargs')
    , __kwargs = !!~kidx && !obj.__kwargs ? {} : null

  // Check for sent kwargs object
  if (toString.call(obj) === '[object Object]') {
    start = 2
    for (var prop in obj) {
      idx = names.indexOf(prop)
      if (!!~idx) {
        list[idx] = obj[prop]
      } else if (__kwargs) {
        __kwargs[prop] = obj[prop]
      }
    }
    __kwargs && (list[kidx] = __kwargs)
  }
  if (!!~aidx && !obj._args) {
    list[aidx] = slice.call(arguments, start)
  } else {
    list = list.concat(slice.call(arguments, start))
  }
  return list
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