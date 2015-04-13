/*jshint unused:false, indent:2*/
/*global jQuery*/
var ThirdPartyInterface = function() {
  function toggleClass(elem, className) {
    if (!elem) {
      throw new Error('toggle class needs an element to act on');
    }

    if (!className) {
      throw new Error('toggle class needs an className to toggle');
    }

    jQuery(elem).toggleClass(className);
  }

  return {
    toggleClass: toggleClass
  };
};