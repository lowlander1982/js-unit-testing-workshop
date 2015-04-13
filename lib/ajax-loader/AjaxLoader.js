/*jshint unused:false, indent:2*/
/*global jQuery*/
/**
 * Returns a Promise for an ajax method
 */

var AjaxLoader = function(url) {
  'use strict';

  var deferred = new jQuery.Deferred();

  var url = url;

  if (typeof url !== 'string') {
    throw new Error('the URL for the AjaxLoader must be a string');
  }

  this.load = function() {
    jQuery.get(url)
      .done(function(data) {
        // do something here
        deferred.resolve(data);
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        // do something here
        deferred.reject(textStatus, errorThrown);
      });
    return deferred.promise();
  };
};