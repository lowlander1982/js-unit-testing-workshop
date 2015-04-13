/*jshint unused:false, indent:2*/
var Tester = function() {
  'use strict';

  var foo = 'bar';

  function getFoo() {
    return foo;
  }

  return {
    foo: foo,
    getFoo: getFoo
  };
};