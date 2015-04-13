/* jshint unused:false, indent:2, dom:true */
/* global describe, it, beforeEach, expect, spyOn, createSpyObject, ThirdPartyInterface */

/**
 * @fileOverview - Tests for Newsletter signup module
 */
describe('Newsletter signup form module', function() {

  // instantiated SignupForm
  var signupFormInstance;

  // create the form stub
  var signupForm = document.createElement('form');
  signupForm.setAttribute('method', 'POST');
  signupForm.setAttribute('action', 'http://www.example.com/signup');
  signupForm.innerHTML += '<label for="email">Email address</label>';
  signupForm.innerHTML += '<input id="email" data-validation="isEmail" type="email" value="">';
  signupForm.innerHTML += '<input type="submit" value="submit">';

  // Validator mock & spies
  var Validator = function () {};
  window.Validator = Validator;

  var isEmailSpy, isSubmitSpy;

  // form event mock
  var submitEventMock = jasmine.createSpyObj('submitEventMock', ['preventDefault']);

  // setup
  beforeEach(function() {
    Validator.isEmail = function () {};
    Validator.isSubmit = function () {};

    isEmailSpy = spyOn(Validator, 'isEmail').and.returnValue(true);
    isSubmitSpy = spyOn(Validator, 'isSubmit').and.returnValue(true);

    signupFormInstance = new SignupForm(signupForm);
  });


  it('requires a form element to properly instantiate', function() {
    expect(function() { signupFormInstance = new SignupForm(signupForm); }).not.toThrow();
    expect(signupFormInstance._private.formElem).toBe(signupForm);
    expect(signupFormInstance._private.inputs.length).toBe(2);
    expect(signupFormInstance._private.errors).toEqual([]);

    expect(function() { new SignupForm(); }).toThrow();
  });

  describe('validates form inputs', function() {

    it('runs the validation methods supplied by the DOM', function() {
      var emailInput = signupForm.querySelector('input[type="email"]');
      emailInput.value = 'foo';

      var result = signupFormInstance._private.elemIsValid(emailInput);
      expect(Validator.isEmail).toHaveBeenCalledWith('foo');
      expect(Validator.isSubmit).not.toHaveBeenCalled();
      expect(result).toBe(true);
    });

    it('doesn\'t validate an input if not method is supplied', function() {
      var submitInput = signupForm.querySelector('input[type="submit"]');

      signupFormInstance._private.elemIsValid(submitInput);
      expect(Validator.isEmail).not.toHaveBeenCalled();
      expect(Validator.isSubmit).not.toHaveBeenCalled();
    });

    it('iterates over all inputs and validates each appropriately', function() {
      expect(signupFormInstance._private.formIsValid()).toBe(true);

      isEmailSpy.and.returnValue(false);
      expect(signupFormInstance._private.formIsValid()).toBe(false);
    });

  });

  it('submits the form when no errors are found', function() {
    expect(signupFormInstance.send(submitEventMock)).toBe(true);

    isEmailSpy.and.returnValue(false);
    expect(signupFormInstance.send(submitEventMock)).toBe(false);
    expect(submitEventMock.preventDefault).toHaveBeenCalled();
  });

});