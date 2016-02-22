'use strict';

describe('Directive: wpfloat', function () {

  // load the directive's module
  beforeEach(module('re2App'));

  var scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  /*it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<wpfloat></wpfloat>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the wpfloat directive');
  }));
  */
});
