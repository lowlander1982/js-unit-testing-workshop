/*jshint unused:false, indent:2*/
/* global describe, it, beforeEach, expect, Tester */
describe('The Tester module is a Test Object', function() {
  var tester;

  beforeEach(function() {
    tester = new Tester();
  });

  it('stores the foo value', function() {
    expect(tester.foo).toEqual('bar');
    expect(function() {
      tester.foo = 'baz';
    }).not.toThrow();
    expect(tester.foo).toEqual('baz');
  });

  it('allows for retrieval of foo', function() {
    expect(function() {
      tester.getFoo();
    }).not.toThrow();
    expect(tester.getFoo()).toEqual('bar');
  });
});