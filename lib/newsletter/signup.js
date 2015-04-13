/* jshint unused:false, indent:2, dom:true */
/* global Validator*/

/**
 * @fileOverview - Newsletter signup module
 */
var SignupForm = function(elem) {
  if (!elem || !elem.nodeName === 'FORM') {
    throw new Error('Signup form requires a form element for construction');
  }

  var formElem = elem;
  var inputs = formElem.querySelectorAll('input');
  var errors = [];

  function send(e) {
    // validate and prevent submission only if its invalid
    if (!formIsValid()) {
      e.preventDefault();
      return false;
    }

    // if no errors are present, send
    return true;
  }

  function formIsValid() {
    // reset the errors array
    errors = [];

    // iterate over all inputs and validate the value
    Array.prototype.forEach.call(inputs, function(elem, index, arr) {
      if (!elemIsValid(elem)) {
        errors.push(elem);
      }
    });
    return (errors.length < 1);
  }

  function elemIsValid(elem) {
    // retrieve the validation method
    var validationMethod = elem.getAttribute('data-validation');

    // validate the value only if there's an associated method
    if (validationMethod && Validator[validationMethod]) {
      return Validator[validationMethod](elem.value);
    }
    return true;
  }

  return {
    send: send,
    _private: {
      formElem: formElem,
      inputs: inputs,
      errors: errors,
      formIsValid: formIsValid,
      elemIsValid: elemIsValid
    }
  };
};