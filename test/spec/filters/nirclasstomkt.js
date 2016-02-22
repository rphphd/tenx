'use strict';

describe('Filter: nirClassToMkt', function () {

  // load the filter's module
  beforeEach(module('re2App'));

  // initialize a new instance of the filter before each test
  var nirClassToMkt;
  beforeEach(inject(function ($filter) {
    nirClassToMkt = $filter('nirClassToMkt');
  }));

  /*it('should return the input prefixed with "nirClassToMkt filter:"', function () {
    var text = 'angularjs';
    expect(nirClassToMkt(text)).toBe('nirClassToMkt filter: ' + text);
  });
  */

});
