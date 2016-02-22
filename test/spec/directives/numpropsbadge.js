'use strict';

describe('Directive: numPropsBadge', function () {

  // load the directive's module
  beforeEach(module('re2App'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<num-props-badge></num-props-badge>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the numPropsBadge directive');
  }));
});
