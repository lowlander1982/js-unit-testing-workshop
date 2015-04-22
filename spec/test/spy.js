/*jshint unused:false, indent:2, dom:true*/
/* global describe, it, beforeEach, expect, spyOn, createSpyObject, ThirdPartyInterface */
describe('ThirdParty Interface', function() {
  var iface;
  var elem = document.createElement('div');
  var className = 'foo';
  var jQueryMock = jasmine.createSpyObj('jQueryMock', ['toggleClass']);
  var jq = window.jQuery;

  beforeEach(function() {
    spyOn(window, 'jQuery').and.returnValue(jQueryMock);
    iface = new ThirdPartyInterface();
  });

  afterEach(function() {
    window.jQuery = jq;
    jq = undefined;
  });

  describe('proxies calls to jQuery\'s toggleClass method', function() {
    it('should call jQuery\'s method when calling toggleClass', function() {
      iface.toggleClass(elem, className);
      expect(window.jQuery).toHaveBeenCalled();
      expect(jQueryMock.toggleClass).toHaveBeenCalledWith(className);
    });

    it('should throw an exception if no elem is passed', function() {
      expect(function() {
        iface.toggleClass();
      }).toThrow();
    });

    it('should throw an exception if no class is passed', function() {
      expect(function() {
        iface.toggleClass(elem);
      }).toThrow();
    });
  });
});
