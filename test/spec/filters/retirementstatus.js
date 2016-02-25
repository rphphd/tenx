'use strict';

describe('Filter: retirementStatus', function () {

  // load the filter's module
  beforeEach(module('re2App'));

  // initialize a new instance of the filter before each test
  var retirementStatus;
  beforeEach(inject(function ($filter) {
    retirementStatus = $filter('retirementStatus');
  }));

/*  it('should return the input prefixed with "retirementStatus filter:"', function () {
    var text = 'angularjs';
    expect(retirementStatus(text)).toBe('retirementStatus filter: ' + text);
  });*/

});
