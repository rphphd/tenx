'use strict';

describe('Filter: invGoal', function () {

  // load the filter's module
  beforeEach(module('re2App'));

  // initialize a new instance of the filter before each test
  var invGoal;
  beforeEach(inject(function ($filter) {
    invGoal = $filter('invGoal');
  }));

  /*
  it('should return the input prefixed with "invGoal filter:"', function () {
    var text = 'angularjs';
    expect(invGoal(text)).toBe('invGoal filter: ' + text);
  });
  */
});
