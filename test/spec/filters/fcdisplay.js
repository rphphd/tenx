'use strict';

describe('Filter: fcDisplay', function () {

  // load the filter's module
  beforeEach(module('re2App'));

  // initialize a new instance of the filter before each test
  var fcDisplay;
  beforeEach(inject(function ($filter) {
    fcDisplay = $filter('fcDisplay');
  }));

  /*it('should return the input prefixed with "fcDisplay filter:"', function () {
    var text = 'angularjs';
    expect(fcDisplay(text)).toBe('fcDisplay filter: ' + text);
  });
  */

});
