/*global jQuery*/
'use strict';

var LoadMore = function(container, triggerClassName, destinationClassName) {
  if (!container || !triggerClassName || !destinationClassName) {
    throw new Error('an argument is missing from the LoadMore constructor');
  }

  this.container_ = container;
  this.triggerClassName_ = triggerClassName;
  this.trigger_ = this.container_.querySelector('.' + this.triggerClassName_);
  this.destinationClassName_ = destinationClassName;
  this.destination_ = this.container_.querySelector('.' + this.destinationClassName_);

  this.container_.addEventListener('click', this.handleTriggerClick_.bind(this));
};

LoadMore.prototype.handleTriggerClick_ = function (e) {
  if (!e) {
    throw new Error('Missing event argument');
  }

  if (e.target.className.indexOf(this.triggerClassName_) !== -1) {
    this.load(e.target.href);
  }
};

LoadMore.prototype.load = function (url) {
  if (!url) {
    throw new Error('A URL is required to load the content');
  }
  jQuery.get(url)
    .done(this.handleLoadSuccess_.bind(this))
    .fail(this.handleLoadFailure_.bind(this));
};

LoadMore.prototype.handleLoadSuccess_ = function (data) {
  if (data !== '') {
    this.destination_.innerHTML += data;
  }
}

LoadMore.prototype.handleLoadFailure_ = function () {
  throw new Error('Ajax fail');
}